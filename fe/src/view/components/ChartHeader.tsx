import {XCircle} from "lucide-react";

interface ChartHeaderProps {
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export const ChartHeader = ({children, onClose}: ChartHeaderProps) => {
  return (
    <header className="bg-primary text-white p-2 rounded-t-lg justify-center flex">
      <span className="text-white flex-1 text-center font-semibold">
        {children}
      </span>

      {onClose && (
        <div
          onClick={onClose}
          className="flex items-center justify-end pointer cursor-pointer p-1 z-50"
        >
          <XCircle />
        </div>
      )}
    </header>
  );
};
