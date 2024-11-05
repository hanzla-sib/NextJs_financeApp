import { sizes, variants } from "@/lib/variants";
import { twMerge } from "tailwind-merge";

export default function Button(props) {
  return (
    <button
      {...props}
      className={twMerge(
        props.variant ? variants[props.variant] : variants["default"],
        props.size ? sizes[props.size] : sizes["base"],
        props.className
      )}
    ></button>
  );
}
