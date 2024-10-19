import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { createClient } from "@/lib/supabase/server";

const groupAndSumTransactionsByDate = (transactions) => {
  const grouped = {};
  for (const trasaction of transactions) {
    const date = trasaction.created_at.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(trasaction);
    const amount =
      trasaction.type === "Expense" ? -trasaction.amount : transactions.amount;
    grouped[date].amount += amount;
  }
  return grouped;
};
export default async function TransactionList() {
  // const response = await fetch(`${process.env.API_URL}/transactions`,{
  //   next:{
  //     tags:['transaction-list']
  //   }
  // });
  // const transactions = await response.json();
  const Supabase = createClient();
  const { data: transactions, error } = await Supabase.from("transactions")
    .select("*")
    .order("created_at", { ascending: true });
  const grouped = groupAndSumTransactionsByDate(transactions);
  return (
    // <section className="space-y-4">
    //   {transactions.map((transaction) => (
    //     <div key={transaction.id}>
    //       <TransactionItem
    //         // type={transaction.type}
    //         // category={transaction.category}
    //         // description={transaction.description}
    //         // amount={transaction.amount}
    //         {...transaction}
    //       />
    //     </div>
    //   ))}
    // </section>
    <div>
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />
          <Seperator />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}
