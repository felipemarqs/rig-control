import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {useGrouppedRepairs} from "./useGrouppedRepairs";
import {ExternalLink, PieChart} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {NotFound} from "@/view/components/NotFound";

export const GrouppedRepairsCard = () => {
  const {repairGroupedData, handleSelectEquipment, hasRepairData} =
    useGrouppedRepairs();

  console.log("Repair Groupped Data", repairGroupedData.groupedData);

  return (
    <Card
      className={cn(
        "col-span-12 lg:col-span-3 lg:col-start-1 row-span-2 col-start-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]",
        repairGroupedData.groupedData.length >= 4 ? "overflow-y-scroll" : ""
      )}
    >
      <CardHeader className="px-7">
        <CardTitle>Reparos</CardTitle>
        <CardDescription>
          Lista dos reparos de equipamentos durante o período selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasRepairData && (
          <NotFound>Não possui reparos no período selecionado</NotFound>
        )}
        {hasRepairData && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipamento</TableHead>
                <TableHead className="hidden sm:table-cell">Tempo</TableHead>
                <TableHead className="flex justify-center items-center ">
                  <PieChart />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repairGroupedData.groupedData.map(
                ({id, equipment, totalHours}) => (
                  <TableRow key={id}>
                    <TableCell>
                      <div className="font-medium">{equipment}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {totalHours} Hrs
                    </TableCell>
                    <TableCell
                      className="flex justify-center items-center cursor-pointer "
                      onClick={() => handleSelectEquipment(id)}
                    >
                      <ExternalLink />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
