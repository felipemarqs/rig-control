import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {DollarSign, TimerOff, Wrench} from "lucide-react";
import {useStatboxContainer} from "./useStatboxContainer";
import {formatCurrency} from "@/app/utils/formatCurrency";

export const StatboxContainer = () => {
  const {totalAmount, totalRepairAmount, totalUnbilledAmount} =
    useStatboxContainer();

  return (
    <>
      <Card className=" col-span-12 row-span-1 lg:col-span-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Faturamento Total
          </CardTitle>
          <DollarSign className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalAmount)}
          </div>
          <p className="text-xs text-muted-foreground">
            Faturamento total no período selecionado
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card className="col-span-12 row-span-1 lg:col-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Glosa
          </CardTitle>
          <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {formatCurrency(totalUnbilledAmount)}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Total não faturado no período selecionado
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card className=" col-span-12 row-span-1 lg:col-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Reparo
          </CardTitle>
          <Wrench className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {formatCurrency(totalRepairAmount)}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Total não faturado por reparo de equipamento
          </p>
        </CardContent>
      </Card>
    </>
  );
};
