import {ComponentProps, forwardRef} from "react";
import {ErrorContainer} from "./ErrorContainer";
import {cn} from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({placeholder, className, name, id, error, ...props}, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          {...props}
          id={inputId}
          ref={ref}
          name={name}
          placeholder=" "
          // className="bg-primary-500 w-full rounded-lg border-2 text-white border-white px-3 h-10"
          className={cn(
            `appearance-none bg-primary-500 w-full rounded-lg border-2 text-white border-white px-3 pt-2 h-10 placeholder-shown:pt-0 focus:border-white peer transition-all outline-none hover:bg-primary-600 hover:border-3`,
            error && "!border-redAccent-500",
            className
          )}
        />

        <label
          htmlFor={inputId}
          //className="absolute left-[14px] top-2 text-white pointer-events-none"
          className="absolute text-xs left-[14px] top-[1px] text-white pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all"
        >
          {placeholder}
        </label>
        {error && <ErrorContainer error={error} />}
      </div>
    );
  }
);
