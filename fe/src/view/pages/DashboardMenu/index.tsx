import {BarChartBig, LineChart} from "lucide-react";
import {Header} from "../../components/Header";
import {useDashboardMenu} from "./useDashboardMenu";
import {NNavBar} from "../../components/NNavbar";

export const DashboardMenu = () => {
  const {navigate, isUserAdm} = useDashboardMenu();

  return (
    <div className="w-full h-full overflow-y-scroll">
      {/*  <NNavBar /> */}
      <Header title="DASHBOARD" subtitle="Menu de Dashboard" />
      <div className="w-full h-4/5 flex justify-center items-center">
        <div className="w-10/12 grid grid-cols-12 auto-rows-[120px] gap-3 bg-gray-400 p-8 rounded-md">
          <div
            className="col-start-3 col-span-3 row-span-2 p-4 bg-white rounded-2xl h-full flex flex-col justify-around items-center border-b-4  border-teal-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            style={{borderColor: "#81c460"}}
            role="button"
            onClick={() => navigate("/dashboard")}
          >
            <LineChart size={100} />
            <span className="text-center">Dashboard por Sonda</span>
          </div>

          {isUserAdm && (
            <div
              className="col-start-8 col-span-3 row-span-2 p-4 bg-white rounded-2xl h-full flex flex-col justify-around items-center border-b-4  border-teal-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
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
