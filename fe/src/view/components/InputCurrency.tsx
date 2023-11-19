import {NumericFormat} from "react-number-format";
import {ErrorContainer} from "./ErrorContainer";
import {cn} from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;
  onChange?(value: string | number): void;
  value: string | number;
  styles?: string;
}
export const InputCurrency = ({
  error,
  onChange,
  value,
  styles,
}: InputCurrencyProps) => {
  return (
    <>
      <NumericFormat
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "w-[50%] text-lg text-gray-800 bg-white font-bold tracking-[-1px] outline-none",
          error && "text-red-500",
          styles
        )}
        decimalSeparator=","
        decimalScale={2}
      />

      {error && <ErrorContainer error={error} />}
    </>
  );
};
