import { ComponentProps, forwardRef } from "react";
import { ErrorContainer } from "./ErrorContainer";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
  labelStyles?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, name, id, error, labelStyles, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          {...props}
          id={inputId}
          ref={ref}
          name={name}
          placeholder=""
          // className="bg-primary w-full rounded-lg border-2 text-white border-white px-3 h-10"
          className={cn(
            `appearance-none bg-primary w-full rounded-lg border-2 text-white border-white px-3 pt-2 h-[52px] placeholder-shown:pt-0 focus:border-white peer transition-all outline-none hover:bg-primary hover:border-3`,
            error && "!border-redAccent-500",
            className
          )}
        />

        <label
          htmlFor={inputId}
          //className="absolute left-[14px] top-2 text-white pointer-events-none"
          className={cn(
            "absolute text-xs left-[13px] top-2   text-white pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all",
            labelStyles
          )}
        >
          {placeholder}
        </label>
        {error && <ErrorContainer error={error} />}
      </div>
    );
  }
);
