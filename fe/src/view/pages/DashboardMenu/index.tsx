import {BarChartBig, LineChart} from "lucide-react";
import {Header} from "../../components/Header";
import {useDashboardMenu} from "./useDashboardMenu";
import {MenuCard} from "@/view/components/MenuCard";

export const DashboardMenu = () => {
  const {isUserAdm} = useDashboardMenu();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="w-full flex justify-center items-center">
        <div className=" w-full mt-12 flex flex-col justify-start items-center gap-4 lg:pl-8 lg:flex-row">
          {isUserAdm && (
            <MenuCard
              title="Dashboard Geral"
              Icon={BarChartBig}
              description="Explore o painel global para análises abrangentes e insights
            sobre o desempenho geral."
              navigateTo="global-dashboard"
            />
          )}
          <MenuCard
            title="Dashboard por Sonda"
            Icon={LineChart}
            description="Acesse o painel específico da sonda para visualizar dados
                  detalhados."
            navigateTo="dashboard"
          />
        </div>
      </div>
    </div>
  );
};
