import {BagdeStatus} from "./BagdeStatus";

interface HeaderProps {
  displayRig: boolean;
  displayPeriodRange?: boolean;
  title: string;
  children?: React.ReactNode;
}
export const Header = ({
  title,
  displayRig,
  children,
  displayPeriodRange = true,
}: HeaderProps) => {
  return (
    <div className="flex justify-between p-4">
      <div className="flex flex-col gap-4">
        <span className="text-gray-800 text-2xl font-semibold tracking-[-1px]">
          {title}
        </span>
        {displayPeriodRange && <BagdeStatus displayRig={displayRig} />}
      </div>
      {children && children}
    </div>
  );
};
