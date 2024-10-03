import React from "react";
import Transactionform from "../../components/transaction-form";
export const metadata = {
  title: "Add Transaction",
};
const page = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Add Transaction</h1>
      <Transactionform />
    </>
  );
};

export default page;
