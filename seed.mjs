import dotenv from "dotenv";

import { createClient } from "@supabase/supabase-js";  // Add the correct file extension

import { faker } from "@faker-js/faker";

dotenv.config({ path: ".env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);


export const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
];

async function seed() {
  let transactions = [];
  for (let i = 0; i < 10; i++) {
    const created_at = faker.date.past();
    let type,
      category = null;
    const typeBias = Math.random();
    if (typeBias < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (typeBias < 0.9) {
      type = "Income";
    } else {
      type = faker.helpers.arrayElement(["saving", "Investment"]);
    }
    let amount;

    switch (type) {
      case "Expense":
        amount = faker.number.int({
          min: 10,
          max: 1000,
        });
        break;
      case "Income":
        amount = faker.number.int({
          min: 2000,
          max: 9000,
        });
        break;
      case "Investment":
      case "Saving":
        amount = faker.number.int({
          min: 3000,
          max: 10000,
        });

        break;
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
    });
  }

  const { error } = await supabase.from("transactions").insert(transactions);
  if (error) {
    console.error(error);
  } else {
    console.log("Data inserted");
  }
}

seed().catch(console.error);
