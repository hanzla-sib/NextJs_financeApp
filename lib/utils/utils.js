// Function to group and sum transactions by date
export const groupAndSumTransactionsByDate = (transactions) => {
  const grouped = {};
  for (const transaction of transactions) {
    // Extract the date part from the transaction's created_at timestamp
    const date = transaction.created_at.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    // Add the transaction to the corresponding date group
    grouped[date].transactions.push(transaction);
    // Calculate the amount based on the transaction type
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    // Sum the amount for the date group
    grouped[date].amount += amount;
  }
  return grouped;
};
