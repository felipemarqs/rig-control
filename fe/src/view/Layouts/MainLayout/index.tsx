import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { SidebarItem } from "../../components/SidebarItem";
import {
  BarChart3,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Settings,
  UserCircle,
  UserCircle2,
  AlarmClockOffIcon,
  FileText,
} from "lucide-react";

import { useSidebarContext } from "../../../app/contexts/SidebarContext";

export const MainLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  const { active } = useSidebarContext();
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          urlText="dashboard"
          isActive={active === "Dashboard"}
        />

        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Statistics"
          urlText="statistics"
          isActive={active === "Statistics"}
        />

        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Users"
          urlText="users"
          isActive={active === "Users"}
        />

        <SidebarItem
          icon={<FileText size={20} />}
          text="Formulário"
          urlText="form"
          isActive={active === "Formulário"}
        />

        <SidebarItem
          icon={<Receipt size={20} />}
          text="Inventário"
          urlText="inventory"
        />

        <SidebarItem
          icon={<Settings size={20} />}
          text="Carros"
          urlText="cars"
        />

        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Faturamento"
          urlText="invoicing"
        />
      </Sidebar>
      <Outlet />
    </div>
  );
};
