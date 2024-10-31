"use client";

import Button from "@/components/button";
import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { fetchTransactions } from "@/lib/action";

import { groupAndSumTransactionsByDate } from "@/lib/utils/utils";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function TransactionList({ initialTransactions }) {
  // Group and sum transactions by date
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);

  const grouped = groupAndSumTransactionsByDate(transactions);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );

  const handleClick = async (e) => {
    setLoading(true);
    let nextTransactions = null;
    try {
      nextTransactions = await fetchTransactions(
        "last12months",
        transactions.length,
        10
      );
      setButtonHidden(nextTransactions.length === 0);

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...nextTransactions,
      ]);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoved = (id) => () => {
    setTransactions((prev) => [
      ...prev.filter((transaction) => transaction.id !== id),
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
                <TransactionItem
                  onRemoved={handleRemoved(transaction.id)}
                  {...transaction}
                />
              </div>
            ))}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray">
          No Transactions found
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center mb-6 mt-6">
          <Button onClick={handleClick} variant="ghost">
            <div className="flex space-x-1">
              {loading && <Loader />}

              <div> Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
