import {BarChartBig, LineChart} from "lucide-react";
import {Header} from "../../components/Header";
import {useDashboardMenu} from "./useDashboardMenu";

export const DashboardMenu = () => {
  const {navigate, isUserAdm} = useDashboardMenu();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="DASHBOARD" subtitle="Menu de Dashboard" />

      <div className="w-full flex justify-center items-center">
        <div className=" w-full mt-12 flex justify-start items-center gap-4 pl-8">
          <div
            className="w-52 h-52 p-4 bg-white rounded-2xl  flex flex-col justify-around items-center border-b-4  border-teal-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            style={{borderColor: "#81c460"}}
            role="button"
            onClick={() => navigate("/dashboard")}
          >
            <LineChart size={100} />
            <span className="text-center">Dashboard por Sonda</span>
          </div>

          {isUserAdm && (
            <div
              className="w-52 h-52 p-4 bg-white rounded-2xl  flex flex-col justify-around items-center border-b-4  border-teal-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              style={{borderColor: "#81c460"}}
              role="button"
              onClick={() => navigate("/global-dashboard")}
            >
              <BarChartBig size={100} />
              <span className="text-center">Dashboard Geral</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
