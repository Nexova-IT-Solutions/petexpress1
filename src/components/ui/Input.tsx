import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, containerClassName, type, ...props }, ref) => {
    return (
      <div className={cn("space-y-1", containerClassName)}>
        {label && (
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full px-3 py-2 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none transition-all placeholder:text-gray-300",
            error
              ? "border-red-400"
              : "border-gray-200 focus:border-import-red",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
