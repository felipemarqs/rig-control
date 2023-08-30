import {ComponentProps} from "react";
import {cn} from "../../app/utils/cn";
import {Spinner} from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export const Button = ({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "bg-primary-500  px-6  h-12  w-full  rounded-xl text-white hover:bg-primary-600 active:bg-primary-700 disabled:text-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-all",
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner />}
    </button>
  );
};
