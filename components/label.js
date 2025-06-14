import { twMerge } from "tailwind-merge";

export default function Label(props) {
  return (
    <label
      {...props}
      className={twMerge("text-gray-700 dark:text-gray-300 ", props.className)}
    >
      {props.children}
    </label>
  );
}
