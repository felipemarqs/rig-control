import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {useRigBillingConfigListCard} from "./useRigBillingConfigListCard";
import {ExternalLink, MoreHorizontal, PieChart} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {formatCurrency} from "@/app/utils/formatCurrency";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

export const RigBillingConfigListCard = () => {
  const {configs, handleOpenEditConfigModal} = useRigBillingConfigListCard();

  return (
    <Card
      className={cn(
        "col-span-12 lg:col-span-5  row-span-3 col-start-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]",
        configs.length >= 4 ? "overflow-y-scroll" : ""
      )}
    >
      <CardHeader className="px-7">
        <CardTitle>Métricas para cálculo de faturamento das sondas</CardTitle>
        <CardDescription>
          Lista dos reparos de equipamentos durante o período selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sonda</TableHead>
              <TableHead>Hora Disp.</TableHead>
              <TableHead className="hidden sm:table-cell">
                Hora Indisp.
              </TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {configs.map((config) => (
              <TableRow key={config.id}>
                <TableCell>
                  <div className="font-medium">{config.rig.name}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {formatCurrency(config.availableHourTax)}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatCurrency(config.glossHourTax)}
                </TableCell>
                <TableCell className="flex justify-center items-center cursor-pointer ">
                  {" "}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          onClick={() => handleOpenEditConfigModal(config)}
                        >
                          Editar Métricas
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
