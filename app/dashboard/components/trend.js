import BaseTrend from "@/components/trend";

export default async function Trend({ type }) {
  console.log('API_URL:', process.env.API_URL);

  const response = await fetch(`${process.env.API_URL}/trends/${type}`);
  const { amount, prevAmount } = await response.json();

  return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
 
}
