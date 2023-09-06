import {Outlet} from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {SidebarItem} from "../../components/SidebarItem";
import {
  BarChart3,
  LayoutDashboard,
  UserCircle,
  FileText,
  CircleDollarSignIcon,
} from "lucide-react";

import {useSidebarContext} from "../../../app/contexts/SidebarContext";
import {useAuth} from "../../../app/hooks/useAuth";

export const MainLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  const {active} = useSidebarContext();
  const {isUserAdm} = useAuth();
  return (
    <div className="flex w-screen h-screen">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          urlText="dashboard"
          isActive={active === "Dashboard"}
        />

        {isUserAdm && (
          <SidebarItem
            icon={<CircleDollarSignIcon size={20} />}
            text="Dashboard Faturamento"
            urlText="invoicing-dashboard"
            isActive={active === "Dashboard Faturamento"}
          />
        )}

        <SidebarItem
          icon={<FileText size={20} />}
          text="Formulário"
          urlText="form"
          isActive={active === "Formulário"}
        />

        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Listar Ocorrências"
          urlText="list"
          isActive={active === "Listar Ocorrências"}
        />

        {isUserAdm && (
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Cadastrar Sonda"
            urlText="rig"
            isActive={active === "Cadastrar Sonda"}
          />
        )}
      </Sidebar>
      <Outlet />
    </div>
  );
};
