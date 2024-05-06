import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import {CalendarChart} from "./components/CalendarChart";
import {useCalendarChartCard} from "./useCalendarChartCard";
import {NotFound} from "@/view/components/NotFound";
import {Spinner} from "@/view/components/Spinner";

export const CalendarChartCard = () => {
  const {isEmpty, isFetchingEfficiencies} = useCalendarChartCard();
  return (
    <Card className="col-span-12 row-span-3 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <CardHeader className="px-7">
        <CardTitle>Monitoramento de Registros </CardTitle>
        <CardDescription>
          Este gráfico mostra a frequência de operações ao longo do tempo. Cada
          quadrado representa um dia, com a cor verde indicando 100% de
          eficiência nos registros, a cor amarela indicando eficiência inferior
          a 100% nos registros, e a ausência de cor indicando a falta de
          registro para esse dia. Use esta visualização para entender como a
          atividade se distribui ao longo do tempo e identificar padrões de
          comportamento.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full p-0">
        {isFetchingEfficiencies && <Spinner />}
        {!isFetchingEfficiencies && !isEmpty && (
          <div className="max-w-full h-full">
            <CalendarChart />
          </div>
        )}

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
