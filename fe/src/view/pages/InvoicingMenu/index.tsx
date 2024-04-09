import {CircleDollarSignIcon, Receipt} from "lucide-react";
import {Header} from "../../components/Header";
import {useInvoicingMenu} from "./useInvoicingMenu";

export const InvoicingMenu = () => {
  const {navigate} = useInvoicingMenu();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="FATURAMENTO" subtitle="Menu de Faturamento" />

      <div className="w-full flex justify-center items-center">
        <div className=" w-full mt-12 flex justify-start items-center gap-4 pl-8">
          <div
            className="w-52 h-52 p-4 bg-white rounded-2xl  flex flex-col justify-around items-center border-b-4  border-teal-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            style={{borderColor: "#81c460"}}
            role="button"
            onClick={() => navigate("/invoicing-rig-dashboard")}
          >
            <CircleDollarSignIcon size={100} />
            <span className="text-center">Visão de faturamento por Sonda</span>
          </div>

          <div
            className="w-52 h-52 p-4 bg-white rounded-2xl  flex flex-col justify-around items-center border-b-4  border-teal-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            style={{borderColor: "#81c460"}}
            role="button"
            onClick={() => navigate("/invoicing-dashboard")}
          >
            <Receipt size={100} />
            <span className="text-center">Visão de faturamento Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};
