import {ComponentProps} from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  //error?: string;
}

export const Input = ({placeholder, name, id, ...props}: InputProps) => {
  const inputId = id ?? name;
  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        name={name}
        placeholder=" "
        // className="bg-primary-500 w-full rounded-lg border-2 text-white border-white px-3 h-10"
        className="
        bg-primary-500 w-full rounded-lg border-2 text-white border-white px-3 pt-2 h-10 placeholder-shown:pt-0 focus:border-white peer transition-all outline-none 
        hover:bg-primary-600
        hover:border-3"
      />

      <label
        htmlFor={inputId}
        //className="absolute left-[14px] top-2 text-white pointer-events-none"
        className="absolute text-xs left-[14px] top-[1px] text-white pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
};
