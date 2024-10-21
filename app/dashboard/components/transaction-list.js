import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { createClient } from "@/lib/supabase/server";

// Function to group and sum transactions by date
const groupAndSumTransactionsByDate = (transactions) => {
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

export default async function TransactionList() {
  // Fetch transactions from the API (commented out)
  // const response = await fetch(`${process.env.API_URL}/transactions`,{
  //   next:{
  //     tags:['transaction-list']
  //   }
  // });
  // const transactions = await response.json();

  // Create a Supabase client instance
  const Supabase = createClient();
  // Fetch transactions from the Supabase database
  const { data: transactions, error } = await Supabase.from("transactions")
    .select("*")
    .order("created_at", { ascending: true });

  // Group and sum transactions by date
  const grouped = groupAndSumTransactionsByDate(transactions);

  return (
    <div>
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          {/* Display the transaction summary for the date */}
          <TransactionSummaryItem date={date} amount={amount} />
          <Seperator />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                {/* Display each transaction item */}
                <TransactionItem {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}