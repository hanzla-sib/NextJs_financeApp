import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import React from "react";

const Transactionform = () => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <Label className="mb-1">Type</Label>
          <Select>
            {types.map((data, key) => (
              <option key={key}>{data}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label className="mb-1">Category</Label>
          <Select>
            {categories.map((data, key) => (
              <option key={key}>{data}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="date" className="mb-1">
            Date
          </Label>
          <Input id="date" type="date" />
        </div>
        <div>
          <Label htmlFor="amount" className="mb-1">
            Amount{" "}
          </Label>

          <Input id="amount" type="number" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="description" className="mb-1">
            Description{" "}
          </Label>

          <Input id="description" type="text" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default Transactionform;
