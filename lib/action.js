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
