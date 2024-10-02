import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transactionListfallback";

const page = () => {
  return (
    <Suspense fallback={<TransactionListFallback />}>
      <TransactionList />
    </Suspense>
  );
};

export default page;
