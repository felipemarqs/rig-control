import { CircleDollarSignIcon, Receipt } from "lucide-react";
import { Header } from "../../components/Header";
import { useInvoicingMenu } from "./useInvoicingMenu";
import { MenuCard } from "@/view/components/MenuCard";

export const InvoicingMenu = () => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="FATURAMENTO" subtitle="Menu de Faturamento" />

      <div className="w-full flex justify-center items-center">
        <div className=" w-full mt-12 flex flex-col justify-start items-center gap-4 lg:pl-8 lg:flex-row">
          <MenuCard
            title=" Visão de faturamento por Sonda"
            Icon={CircleDollarSignIcon}
            description="Explore detalhes específicos de faturamento por sonda para uma análise mais granular e precisa."
            navigateTo="invoicing-rig-dashboard"
          />

          <MenuCard
            title=" Visão de faturamento Total"
            Icon={Receipt}
            description="Acesse uma visão abrangente do faturamento total, oferecendo insights sobre o desempenho financeiro global da aplicação."
            navigateTo="invoicing-dashboard"
          />
        </div>
      </div>
    </div>
  );
};
