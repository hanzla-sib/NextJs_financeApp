import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transactionListfallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trendFallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { createClient } from "@/lib/supabase/server";
import { ErrorBoundary } from "react-error-boundary";
import { types } from "@/lib/consts";
import Range from "./components/range";
import { Transactionlistwrapper } from "./components/transaction-list-wrapper";
const page = async ({ searchParams }) => {
  const client = createClient();
  // console.log("hello", (await client.from("transactions").select("*")).data);
  const range = searchParams?.range ?? "last12months";
  const supabase = createClient();
  console.log("hello", await supabase.auth.getUser());
  return (
    <div className="space-y-8">
      <section className=" flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range />
        </aside>
      </section>
      <section className=" grid grid-cols-2 lg:grid-cols-4 gap-8">
        {types?.map((data, id) => (
          <ErrorBoundary
            key={id}
            fallback={
              <div className="text-red-500">
                Cannot fetch Income trends data
              </div>
            }
          >
            <Suspense fallback={<TrendFallback />}>
              <Trend type={data} />
            </Suspense>
          </ErrorBoundary>
        ))}

        {/* <Suspense fallback={<TrendFallback />}>
          <Trend type={"Expense"} />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type={"Saving"} />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type={"Investment"} />
        </Suspense> */}
      </section>
      <section className="flex justify-between items-center ">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <Transactionlistwrapper range={range} />
      </Suspense>
    </div>
  );
};

export default page;
