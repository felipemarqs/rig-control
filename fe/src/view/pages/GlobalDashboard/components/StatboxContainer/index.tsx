import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {FileClock, TimerIcon, TimerOff, Wrench} from "lucide-react";
import {useStatboxContainer} from "./useStatboxContainer";

export const StatboxContainer = () => {
  const {averageHours, averageHoursPercentage, glossHours, repairHours} =
    useStatboxContainer();
  return (
    <div className="grid gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Disp. Diária</CardTitle>
          <TimerIcon className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`${averageHours} Horas`}</div>
          <p className="text-xs text-muted-foreground">
            Média de disponibilidade diária
          </p>
        </CardContent>
        <CardFooter>
          <Progress value={averageHoursPercentage} />
        </CardFooter>
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
          <div className="text-2xl font-bold text-redAccent-500">{`${(
            24 - averageHours
          ).toFixed(2)} Horas`}</div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Média de indisponibilidade diária
          </p>
        </CardContent>
        <CardFooter>
          <Progress
            value={100 - averageHoursPercentage}
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
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Reparo
          </CardTitle>
          <Wrench className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {`${repairHours.toFixed(2)} Horas`}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Horas não faturadas por reparo de equipamento
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
            {`${glossHours.toFixed(2)} Horas`}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Horas não faturadas
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
