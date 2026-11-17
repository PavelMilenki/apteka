import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  className,
  onCheckedChange,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      autoComplete="off"
      className={cn(
        "size-4 shrink-0 cursor-pointer rounded border-slate-300 text-blue-500 accent-blue-500",
        className,
      )}
      onChange={(event) => {
        onChange?.(event);
        onCheckedChange?.(event.target.checked);
      }}
      {...props}
    />
  );
}
