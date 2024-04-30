import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {NotFound} from "@/view/components/NotFound";
import {Spinner} from "@/view/components/Spinner";

import {useLineChartCard} from "./useLineChartCard";
import {LineChart} from "./components/LineChart";

export const LineChartCard = () => {
  const {isFetchingEfficiencies, isEmpty} = useLineChartCard();
  return (
    <Card
      className={cn(
        "row-span-2 lg:col-span-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      )}
    >
      <CardHeader className="pb-0">
        <CardTitle>Eficiência Diária</CardTitle>
        <CardDescription>Gráfico com os dias</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-4/5  flex justify-center items-center">
        {isFetchingEfficiencies && <Spinner />}
        {!isFetchingEfficiencies && !isEmpty && <LineChart />}
        {!isFetchingEfficiencies && isEmpty && (
          <NotFound>
            {
              <p>
                Sem dados para o <strong>período</strong> selecionado
              </p>
            }
          </NotFound>
        )}
      </CardContent>
    </Card>
  );
};
