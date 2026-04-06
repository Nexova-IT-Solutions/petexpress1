import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  options?: (string | { label: string; value: string })[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, containerClassName, options, placeholder, children, ...props }, ref) => {
    return (
      <div className={cn("space-y-1", containerClassName)}>
        {label && (
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "w-full px-3 py-2 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none appearance-none cursor-pointer pr-10 transition-all",
              error
                ? "border-red-400"
                : "border-gray-200 focus:border-import-red",
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options ? (
              options.map((opt) => {
                const isObj = typeof opt === "object";
                const labelStr = isObj ? opt.label : opt;
                const valueStr = isObj ? opt.value : opt;
                return (
                  <option key={valueStr} value={valueStr}>
                    {labelStr}
                  </option>
                );
              })
            ) : (
              children
            )}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {error && (
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
