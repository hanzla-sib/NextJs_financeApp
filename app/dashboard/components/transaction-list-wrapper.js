import { fetchTransactions } from "@/lib/action";
import TransactionList from "./transaction-list";

export async function Transactionlistwrapper({ range }) {
  const transactions = await fetchTransactions(range);
  return (
    <TransactionList
      key={range}
      initialTransactions={transactions}
      renge={range}
    />
  );
}
