import { useFormatCurrency } from "@/hooks/use-format-currency";
import React from "react";

const TransactionSummaryItem = ({ date, amount }) => {
  const formatedAMount = useFormatCurrency(amount);
  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow">{date}</div>
      <div className="min-w-[70px] text-right font-semibold">
        {formatedAMount}
      </div>
      <div className="min-w-[100px]"></div>
    </div>
  );
};

export default TransactionSummaryItem;
