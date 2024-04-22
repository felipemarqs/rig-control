import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {BarChart} from "./components/BarChart";
import {useBarChardCard} from "./useBarChartCard";
import {Skeleton} from "@/components/ui/skeleton";

export const BarChartCard = () => {
  const {isFetchingBillings} = useBarChardCard();
  return (
    <Card className="col-span-12 row-span-3 lg:col-span-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <CardHeader className="px-7">
        <CardTitle>Faturamento </CardTitle>
        <CardDescription>
          Gráfico com o faturamento das sondas no período selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <div className="max-w-full h-full">
          {!isFetchingBillings && <BarChart />}
          {isFetchingBillings && (
            <div className="flex  gap-10 items-end h-[80%]">
              <Skeleton className=" w-24 h-1/5" />
              <Skeleton className=" w-24 h-full" />
              <Skeleton className=" w-24 h-2/5" />
              <Skeleton className=" w-24 h-full" />
              <Skeleton className=" w-24 h-4/6" />
              <Skeleton className=" w-24 h-full" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
