"use client";

import Button from "@/components/button";
import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { fetchTransactions } from "@/lib/action";

import { groupAndSumTransactionsByDate } from "@/lib/utils/utils";
import { useState } from "react";

export default function TransactionList({ initialTransactions }) {
  // Group and sum transactions by date
  const [transactions, setTransactions] = useState(initialTransactions);
  const [offset, setOffset] = useState(initialTransactions.length);
  const grouped = groupAndSumTransactionsByDate(transactions);
  const handleClick = async (e) => {
    const nextTransactions = await fetchTransactions(
      "last12months",
      offset,
      10
    );
    console.log("next ", nextTransactions);
    setOffset((prev) => prev + 10);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      ...nextTransactions,
    ]);
  };

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
