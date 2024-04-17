import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {DollarSign, FileClock, TimerOff, Wrench} from "lucide-react";
import {useStatboxContainer} from "./useStatboxContainer";

export const StatboxContainer = () => {
  const {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
  } = useStatboxContainer();

  return (
    <div className="grid gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Faturamento Total
          </CardTitle>
          <DollarSign className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAmount}</div>
          <p className="text-xs text-muted-foreground">
            Faturamento total no período selecionado
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Indisp. Diária
          </CardTitle>
          <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {totalUnbilledAmount}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Total não faturado no período selecionado
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-2"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Reparo
          </CardTitle>
          <Wrench className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {totalRepairAmount}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Total não faturado por reparo de equipamento
          </p>
        </CardContent>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-2"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Glosa
          </CardTitle>
          <FileClock className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {totalGlossAmount}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Total não faturado por glosa
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
