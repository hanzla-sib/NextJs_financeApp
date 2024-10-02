import Link from "next/link";
import { twMerge } from "tailwind-merge";
import DarkModeToggle from "./dark-mode-toggle";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
export default function PageHeader({ className }) {
  const theme = useServerDarkMode();
  return (
    <header className={twMerge("flex justify-between items-center", className)}>
      <Link
        className="text-xl hover:underline underline-offset-8 decoration-2"
        href={"/dashboard"}
      >
        Finance Tracker
      </Link>
      <div className="flex items-center space-x-4">
        <DarkModeToggle defaultMode={theme} />
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
