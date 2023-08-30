import {ComponentProps} from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export const Button = ({children, ...props}: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-primary-500
        px-6
        h-12
        w-full
        rounded-xl
       text-white
       hover:bg-primary-600
       active:bg-primary-700
       disabled:text-gray-700
       disabled:bg-gray-400
       disabled:cursor-not-allowed
       transition-all
       "
    >
      {children}
    </button>
  );
};
