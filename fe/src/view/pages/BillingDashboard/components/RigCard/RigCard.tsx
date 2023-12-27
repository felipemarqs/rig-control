import {Settings} from "lucide-react";
import {cn} from "../../../../../app/utils/cn";
import {formatCurrency} from "../../../../../app/utils/formatCurrency";
import {BillingResponse} from "../../../../../app/services/billingServices/getAll";
import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

interface RigCardProps {
  data: BillingResponse;
}

export const RigCard = ({data}: RigCardProps) => {
  const {handleOpenEditRigModal} = useBillingDashboard();
  const {total, rigname} = data;


  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4  border-teal-950"
      style={{borderColor: "#81c460"}}
      role="button"
      onClick={() => handleOpenEditRigModal(data)}
    >
      <div className="flex justify-between items-center">
        <span className="text-gray-800 tracking-[-0.5] font-medium mt-4 block">
          {rigname}
        </span>
        <Settings />
      </div>
      <div>
        <span
          className={cn(
            "text-gray-800 tracking-[-0.5] font-medium mt-4 block",
            false && "blur-sm"
          )}
        >
          {formatCurrency(total)}
        </span>
        <span className="text-gray-600 text-sm">Faturamento Atual</span>
      </div>
    </div>
  );
};
