"use client";

import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";

import { groupAndSumTransactionsByDate } from "@/lib/utils/utils";

export default function TransactionList({ initialTransactions }) {
  // Group and sum transactions by date
  const grouped = groupAndSumTransactionsByDate(initialTransactions);

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
