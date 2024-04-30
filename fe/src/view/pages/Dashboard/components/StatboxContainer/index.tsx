import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {BaggageClaim, TimerIcon, TimerOff, Truck} from "lucide-react";
import {useStatboxContainer} from "./useStatboxContainer";

export const StatboxContainer = () => {
  const {
    totalAvailableHours,
    availableHoursPercentage,
    totalUnavailableHours,
    unavailableHoursPercentage,
    totalDtms,
    totalMovimentations,
  } = useStatboxContainer();
  return (
    <div className="grid gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Horas Disponiveis
          </CardTitle>
          <TimerIcon className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalAvailableHours.toFixed()}Hrs
          </div>
          <p className="text-xs text-muted-foreground">
            Total de horas faturadas pela sonda
          </p>
        </CardContent>
        <CardFooter>
          <Progress value={availableHoursPercentage} />
        </CardFooter>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Horas Indisponiveis
          </CardTitle>
          <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {totalUnavailableHours.toFixed()}Hrs
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Total de horas não faturadas pela sonda
          </p>
        </CardContent>
        <CardFooter>
          <Progress
            value={unavailableHoursPercentage}
            indicatorColor="bg-redAccent-500"
            className="bg-redAccent-500/20"
          />
        </CardFooter>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-2"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">DTM</CardTitle>
          <Truck className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDtms}</div>
          <p className="text-xs text-muted-foreground">
            Total de DTMs no período selecionado
          </p>
        </CardContent>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-2"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Movimentações</CardTitle>
          <BaggageClaim className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMovimentations}</div>
          <p className="text-xs text-muted-foreground">
            Total de monivmentações de Equipamentos e Fluidos no período
            selecionado
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
