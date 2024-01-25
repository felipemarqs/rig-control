import {CrossCircledIcon} from "@radix-ui/react-icons";

interface CleanFieldContainerProps {
  label: string;
  onClick(): void;
}

export const CleanFieldContainer = ({
  label,
  onClick,
}: CleanFieldContainerProps) => {
  return (
    <div className="flex gap-2 items-center justify-end bg-transparent w-full cursor-pointer">
      <div
        onClick={onClick}
        className="flex gap-2 items-center justify-center mt-2 p-[2px] rounded-md text-black border border-black font-semibold bg-transparent w-1/2"
      >
        <CrossCircledIcon />
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
};
