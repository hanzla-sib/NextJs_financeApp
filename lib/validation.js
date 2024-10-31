import { z } from "zod";
import { categories, types } from "./consts";

export const transactionSchema = z
  .object({
    type: z.enum(types),
    category: z
      .preprocess(
        (val) => (val ? val : undefined), // if val is empty, set to undefined
        z.string().optional()
      )
      .refine((val) => (val ? categories.includes(val) : true), {
        message: "Invalid category selection",
      }),
    amount: z.coerce.number().min(1, {
      message: "Amount must be greater than or equal to 1",
    }),
    description: z.string().optional(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date needs to contain a valid date",
    }),
  })
  .refine(
    (data) => {
      // If type is "Expense", category must be defined and valid
      if (data.type === "Expense") {
        return data.category !== undefined;
      }
      return true;
    },
    {
      path: ["category"],
      message: "Category is required for Expense type",
    }
  );
