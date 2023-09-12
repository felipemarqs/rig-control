import {Settings} from "lucide-react";
import {formatCurrency} from "../../../../../app/utils/formatCurrency";
import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";
import {BillingConfigResponse} from "../../../../../app/services/billingConfigServices/getAll";

interface RigBillingConfigCardProps {
  data: BillingConfigResponse;
}

export const RigBillingConfigCard = ({data}: RigBillingConfigCardProps) => {
  const {handleOpenEditConfigModal} = useBillingDashboard();
  const {} = data;

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[540px] flex flex-col justify-between border-b-4  border-teal-950"
      style={{borderColor: "#81c460"}}
      role="button"
      onClick={() => handleOpenEditConfigModal(data)}
    >
      <div className="flex justify-between items-center border-b-2 border-gray-300">
        <span className="text-gray-800 tracking-[-0.5] font-medium mt-4 block">
          {data.rig.name}
        </span>
        <Settings />
      </div>

      <div className="flex justify-around flex-col h-full">
        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            Hora Disp.
          </span>
          <span>{formatCurrency(data.availableHourTax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            Hora Indisp.
          </span>
          <span>{formatCurrency(data.glossHourTax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            DTM &lt; 20
          </span>
          <span>{formatCurrency(data.dtmLt20Tax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            20 &lt; DTM &gt;= 50
          </span>
          <span>{formatCurrency(data.dtmBt20And50Tax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            DTM &lt; 50
          </span>
          <span>{formatCurrency(data.dtmGt50Tax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            TE &lt; 20
          </span>
          <span>{formatCurrency(data.equipmentRatioLt20Tax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            20 &lt; TE &gt;= 50
          </span>
          <span>{formatCurrency(data.equipmentRatioBt20And50Tax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            TE &lt; 50
          </span>
          <span>{formatCurrency(data.equipmentRatioGt50Tax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            TF &lt; 20
          </span>
          <span>{formatCurrency(data.fluidRatioLt20Tax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            20 &lt; TF &gt;= 50
          </span>
          <span>{formatCurrency(data.fluidRatioBt20And50Tax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            TF &lt; 50
          </span>
          <span>{formatCurrency(data.fluidRatioGt50Tax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600  tracking-[-0.5] font-medium">
            Reajuste
          </span>
          <span>{data.readjustment}x</span>
        </div>
      </div>
    </div>
  );
};
