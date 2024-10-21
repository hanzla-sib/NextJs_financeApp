import BaseTrend from "@/components/trend";
import { createClient } from "@/lib/supabase/server";

export default async function Trend({ type }) {
  const supabase = createClient();
  let { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
  });
  if (error) throw new Error("Could not fetch trend data");

  // console.log('API_URL:', process.env.API_URL);
  const amount = data ?? 0;
  return <BaseTrend type={type} amount={amount} prevAmount={amount - 500} />;
}
