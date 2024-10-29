import { useFormatCurrency } from "@/hooks/use-format-currency";
import { HandCoins, Landmark, PiggyBank, Wallet } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TransactionItemRemoveButton } from "./transaction-item-remove-button";

const TransactionItem = ({
  id,
  type,
  category,
  description,
  amount,
  onRemoved,
}) => {
  const formatedamount = useFormatCurrency(amount);
  const typesmap = {
    Income: {
      icon: HandCoins,
      colors: "text-green-500 dark:text-green-400",
    },
    Expense: {
      icon: Wallet,
      colors: "text-red-500 dark:text-red-400",
    },
    Saving: {
      icon: Landmark,
      colors: "text-indigo-500 dark:text-indigo-400",
    },
    Investment: {
      icon: PiggyBank,
      colors: "text-yellow-500 dark:text-yellow-400",
    },
  };
  const IconComponent = typesmap[type].icon;
  const colors = typesmap[type].colors;
  return (
    <div className="w-full flex items-center">
      <div className="flex items-center mr-4 grow">
        <IconComponent
          className={twMerge(colors, "mr-2 w-4 h-4 hidden sm:block")}
        />
        <span>{description}</span>
      </div>
      <div className="min-w-[150px] items-center hidden md:flex">
        {category && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.2">
            {category}
          </div>
        )}
      </div>
      <div className="min-w-[70px] text-right">{formatedamount}</div>
      <div className="min-w-[100px] flex justify-end">
        <TransactionItemRemoveButton onRemoved={onRemoved} id={id} />
      </div>
    </div>
  );
};

export default TransactionItem;
