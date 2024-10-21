"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { transactionSchema } from "@/lib/validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTransaction, purgeTransactionListCache } from "@/lib/action";
import ErrorZod from "@/components/ErrorZod";
const Transactionform = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
  });
  const type = watch("type");
  const [lastError, setLastError] = useState();
  const [isSaving, setSaving] = useState(false);

  const onSubmit = async (data) => {
    setSaving(true);
    setLastError();
    try {
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     created_at: `${data.created_at}T00:00:00`,
      //   }),
      // });
      // await purgeTransactionListCache();
      await createTransaction(data);
      router.push("/dashboard");
    } catch (e) {
      setLastError(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <Label className="mb-1">Type</Label>
          <Select
            {...register("type", {
              onChange: (e) => {
                if (e.target.value !== "Expense") {
                  setValue("category", undefined);
                }
              },
            })}
          >
            {types.map((data, key) => (
              <option key={key}>{data}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1">Category</Label>
          <Select disabled={type !== "Expense"} {...register("category")}>
            <option value="">Select a category</option>
            {categories.map((data, key) => (
              <option key={key}>{data}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="date" className="mb-1">
            Date
          </Label>
          <Input {...register("created_at")} id="date" type="date" />

          <ErrorZod error={errors.created_at} />
        </div>
        <div>
          <Label htmlFor="amount" className="mb-1">
            Amount{" "}
          </Label>

          <Input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
          />
          <ErrorZod error={errors.amount} />
        </div>
        <div className="col-span-1 md:col-span-2 ">
          <Label htmlFor="description" className="mb-1">
            Description{" "}
          </Label>

          <Input {...register("description")} id="description" type="text" />
          <ErrorZod error={errors.description} />
        </div>
      </div>
      <div>{lastError && <ErrorZod error={lastError} />}</div>
      <div className="flex justify-end">
        <Button disabled={isSaving} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default Transactionform;
