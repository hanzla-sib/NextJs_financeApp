import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { createClient } from "@/lib/supabase/server";
import { groupAndSumTransactionsByDate } from "@/lib/utils/utils";

export default async function TransactionList(range) {
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
  // const { data: transactions, error } = await Supabase.from("transactions")
  //   .select("*")
  //   .order("created_at", { ascending: true });

  let { data: transactions, error } = await Supabase.rpc("fetch_transaction", {
    // limit_arg,
    // offset_arg,
    range_arg: "last12months",
  });
  if (error) throw new Error("trasactiosn not fethced");
  else console.log(transactions);

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
