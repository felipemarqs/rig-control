import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {BarChart} from "./components/BarChart";

export const BarChartCard = () => {
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
          <BarChart />
        </div>
      </CardContent>
    </Card>
  );
};
