import { Badge } from "@/components/ui/badge";
import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useGrouppedRepairs } from "./useGrouppedRepairs";
import { ExternalLink, PieChart } from "lucide-react";

export const Indexx = () => {
  const { repairGroupedData, handleSelectEquipment } = useGrouppedRepairs();

  return (
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
        {repairGroupedData.groupedData.map(({ id, equipment, totalHours }) => (
          <TableRow>
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
        ))}
      </TableBody>
    </Table>
  );
};
