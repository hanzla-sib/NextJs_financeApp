import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import PageHeader from "@/components/page-header";
import Select from "@/components/select";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import Trend from "@/components/trend";

const page = () => {
  return (
    <main className="space-y-8 mb-3">
      <h1 className="text-4xl mt-8">Playground</h1>
      <div>
        <h2 className="mb-4 text-lg font-mono">PageHeader</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div>
          <PageHeader />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="flex space-x-4 justify-between">
          <Trend type="Income" amount={1000} prevAmount={900} />
          <Trend type="Expense" amount={12000} prevAmount={10000} />
          <Trend type="Investment" amount={7000} prevAmount={1110} />
          <Trend type="Saving" amount={500} prevAmount={950} />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">TransactionItem</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <TransactionItem
            type={"Income"}
            description={"salary"}
            amount={2000}
          />
          <TransactionItem
            type={"Income"}
            category={"Food"}
            description={"going out to eat"}
            amount={29}
          />
          <TransactionItem
            type={"Saving"}
            description={"For Education"}
            amount={600}
          />
          <TransactionItem
            type={"Investment"}
            description={"In Microsoft"}
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">
          Transaction Summary Item + TransactionItem
        </h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <TransactionSummaryItem date={"2024-05-01"} amount={3500} />
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <TransactionItem
            type={"Income"}
            description={"salary"}
            amount={2000}
          />
          <TransactionItem
            type={"Income"}
            category={"Food"}
            description={"going out to eat"}
            amount={29}
          />
          <TransactionItem
            type={"Saving"}
            description={"For Education"}
            amount={600}
          />
          <TransactionItem
            type={"Investment"}
            description={"In Microsoft"}
            amount={9000}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-y-8 space-x-2 mb-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>

          <Button size="xs">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Forms </h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="id_name">Your Name</Label>
            <Input type="text" id="id_name" />
          </div>
          <div>
            <Label htmlFor="City_id">City</Label>
            <Select id="City_id" type="text">
              <option>Warsaw</option>
              <option>Berlin</option>
              <option>London</option>
            </Select>
          </div>
          <div className="flex items-center">
            <Input id="terms" type="checkbox" />
            <Label className="ml-2 " htmlFor="terms">
              Accept Terms
            </Label>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
