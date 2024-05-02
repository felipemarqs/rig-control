import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useRepairDetailsPieChartCard} from "./useRepairDetailsPieChartCard";
import {PieChart, X} from "lucide-react";
import {RepairDetailsPieChart} from "./components/RepairDetailsPieChart";
import {cn} from "@/lib/utils";

export const RepairDetailsPieChartCard = () => {
  const {
    handleRemoveSelectedEquipment,
    selectedEquipment,
    isFetchingEfficiencies,
    repairPeriods,
  } = useRepairDetailsPieChartCard();
  return (
    <Card
      className={cn(
        "col-span-12 lg:col-span-3 row-span-2",
        !selectedEquipment && "hidden"
      )}
    >
      <CardHeader className="pl-7 ">
        <div
          className="flex gap-2 items-center justify-between cursor-pointer"
          onClick={() => handleRemoveSelectedEquipment()}
        >
          <CardTitle>Detalhes do Reparo: </CardTitle>
          <X />
        </div>
      </CardHeader>

      <CardContent className="px-2 h-full">
        {selectedEquipment &&
          !isFetchingEfficiencies &&
          repairPeriods.length > 0 && (
            <div className="max-w-full h-full">
              <RepairDetailsPieChart />
            </div>
          )}

        {!selectedEquipment &&
          !isFetchingEfficiencies &&
          repairPeriods.length > 0 && (
            <div className="max-w-full h-[75%] flex justify-center items-center ">
              <PieChart size={96} absoluteStrokeWidth={true} />
            </div>
          )}
      </CardContent>
    </Card>
  );
};
