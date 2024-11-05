"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";

export async function purgeTransactionListCache() {
  revalidateTag("transaction-list");
}

export async function createTransaction(formData) {
  const validationBackend = transactionSchema?.safeParse(formData);
  if (!validationBackend?.success) {
    throw new Error("Invalid data");
  }

  const { error } = await createClient()
    .from("transactions")
    .insert(validationBackend?.data);
  if (error) {
    throw new Error("failed creating the transaction");
  }
  revalidatePath("/dashboard");
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
  // Fetch transactions from the API (commented out)
  // const response = await fetch(`${process.env.API_URL}/transactions`,{
  //   next:{
  //     tags:['transaction-list']
  //   }
  // });
  // const transactions = await response.json();

  // Create a Supabase client instance
  const Supabase = createClient();
  // Fetch transactions from the Supabase database
  // const { data: transactions, error } = await Supabase.from("transactions")
  //   .select("*")
  //   .order("created_at", { ascending: true });

  let { data, error } = await Supabase.rpc("fetch_transaction", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: "last12months",
  });
  if (error) throw new Error("trasactiosn not fethced");
  return data;
}

export async function deleteTransactions(id) {
  const supabase = createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(`failed deleting the transaction ${id}`);
  revalidatePath("/dashboard");
}

export async function UpdateTransaction(id, formData) {
  const validationBackend = transactionSchema?.safeParse(formData);
  if (!validationBackend?.success) {
    throw new Error("Invalid data");
  }

  const { error } = await createClient()
    .from("transactions")
    .update(formData)
    .eq("id", id);
  if (error) {
    throw new Error("failed creating the transaction");
  }
  revalidatePath("/dashboard");
}

export async function login(formData) {
  console.log(formData);
}
