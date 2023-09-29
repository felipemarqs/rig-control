import {cn} from "../../app/utils/cn";

interface TaxInputProps {
  title: string;
  children: React.ReactNode;
  label: string;
  styles?: string;
}
export const TaxInput = ({title, children, label, styles}: TaxInputProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 h-10 border m-1 ",
        styles
      )}
    >
      <span className="text-gray-800">{title}</span>
      <div className="flex w-1/2 justify-end items-center gap-2  ">
        <span className="text-gray-600 tracking-[-0.5px] text-lg">{label}</span>
        {children}
      </div>
    </div>
  );
};
