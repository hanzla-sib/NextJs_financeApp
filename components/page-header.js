import Link from "next/link";
import { twMerge } from "tailwind-merge";
export default function PageHeader({ className }) {
  return (
    <header className={twMerge("flex justify-between items-center", className)}>
      <Link
        className="text-xl hover:underline underline-offset-8 decoration-2"
        href={"/dashboard"}
      >
        Finance Tracker
      </Link>
      <div className="flex items-center space-x-4">
        <div>Mode Toggle</div>
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
