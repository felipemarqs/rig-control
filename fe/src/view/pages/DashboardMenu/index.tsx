import {BarChartBig, LineChart} from "lucide-react";
import {Header} from "../../components/Header";
import {useDashboardMenu} from "./useDashboardMenu";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DashboardMenu = () => {
  const {navigate, isUserAdm} = useDashboardMenu();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="DASHBOARD" subtitle="Menu de Dashboard" />

      <div className="w-full flex justify-center items-center">
        <div className=" w-full mt-12 flex flex-col justify-start items-center gap-4 lg:pl-8 lg:flex-row">
          <Card className="w-[350px] min-h-[224px]">
            <CardHeader className="flex flex-row gap-6  justify-start h-36 ">
              <div className="">
                <LineChart size={30} />
              </div>
              <div className="flex flex-col gap-2">
                <CardTitle>Dashboard por Sonda</CardTitle>
                <CardDescription>
                  Acesse o painel específico da sonda para visualizar dados
                  detalhados.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" onClick={() => navigate("/dashboard")}>
                Abrir
              </Button>
            </CardFooter>
          </Card>

          {isUserAdm && (
            <Card className="w-[350px] min-h-[224px]">
              <CardHeader className="flex flex-row gap-6  justify-start   h-36">
                <div>
                  <BarChartBig size={30} />
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle>Dashboard Geral</CardTitle>
                  <CardDescription>
                    Explore o painel global para análises abrangentes e insights
                    sobre o desempenho geral.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  className="w-full"
                  onClick={() => navigate("/global-dashboard")}
                >
                  Abrir
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
