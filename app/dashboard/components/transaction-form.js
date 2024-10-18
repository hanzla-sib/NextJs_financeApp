"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { transactionSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/router";
import { purgeTransactionListCache } from "@/lib/action";
const Transactionform = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
  });

  const [isSaving, setSaving] = useState(false);
  const onSubmit = async (data) => {
    console.log("data");
    setSaving(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          created_at: `${data.created_at}T00:00:00`,
        }),
      });
      await purgeTransactionListCache();
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <Label className="mb-1">Type</Label>
          <Select {...register("type")}>
            {types.map((data, key) => (
              <option key={key}>{data}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1">Category</Label>
          <Select {...register("category")}>
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
          {errors?.created_at && (
            <p className="mt-1 text-red-500">{errors.created_at.message}</p>
          )}
        </div>
        {/* <div>
          <Label htmlFor="amount" className="mb-1">
            Amount{" "}
          </Label>

          <Input {...register("amount")} id="amount" type="number" />
          {errors?.amount && (
            <p className="mt-1 text-red-500">{errors.amount.message}</p>
          )}
        </div> */}
        <div className="col-span-1 md:col-span-2 ">
          <Label htmlFor="description" className="mb-1">
            Description{" "}
          </Label>

          <Input {...register("description")} id="description" type="text" />
          {errors?.description && (
            <p className="mt-1 text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button disabled={isSaving} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default Transactionform;
