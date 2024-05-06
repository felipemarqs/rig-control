import {useGrouppedGlosses} from "./useGrouppedGlosses";
import {cn} from "../../../../../app/utils/cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {ExternalLink, PieChart} from "lucide-react";
import {translateGlossClassification} from "@/app/utils/translateGlossClassification";
import {NotFound} from "@/view/components/NotFound";

export const GrouppedGlossesCard = () => {
  const {glossGroupedData, handleSelectGloss, hasGlossData} =
    useGrouppedGlosses();

  return (
    <Card
      className={cn(
        "col-span-12   row-span-2  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-3 ",
        glossGroupedData.groupedData.length >= 4 ? "overflow-y-scroll" : ""
      )}
    >
      <CardHeader className="px-7">
        <CardTitle>Glosas</CardTitle>
        <CardDescription>
          Lista dos periodos de glosa durante o período selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasGlossData && (
          <NotFound>Não possui glosas no período selecionado</NotFound>
        )}
        {hasGlossData && (
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
              {glossGroupedData.groupedData.map(({id, gloss, totalHours}) => (
                <TableRow key={id}>
                  <TableCell>
                    <div className="font-medium">
                      {translateGlossClassification(gloss)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {totalHours} Hrs
                  </TableCell>
                  <TableCell
                    className="flex justify-center items-center cursor-pointer "
                    onClick={() => handleSelectGloss(id)}
                  >
                    <ExternalLink />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
