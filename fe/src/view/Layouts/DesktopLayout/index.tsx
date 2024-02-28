import {Outlet} from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {SidebarItem} from "../../components/SidebarItem";
import {
  BarChart3,
  LayoutDashboard,
  UserCircle,
  FileText,
  CircleDollarSignIcon,
  ArchiveX,
  Building2,
  Construction,
  StickyNote,
} from "lucide-react";

import {useSidebarContext} from "../../../app/contexts/SidebarContext";
import {useAuth} from "../../../app/hooks/useAuth";
import {NNavBar} from "../../components/NNavbar";

export const DesktopLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  const {active} = useSidebarContext();
  // const {isUserAdm, userAccessLevel} = useAuth();
  return (
    <div className="w-screen h-screen">
      {/*  <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          urlText=""
          isActive={active === "Dashboard"}
        />

        {isUserAdm && (
          <SidebarItem
            icon={<CircleDollarSignIcon size={20} />}
            text="Faturamento"
            urlText="invoicing"
            isActive={active === "Faturamento"}
          />
        )}

        {userAccessLevel !== "VIEWER" && (
          <>
            <SidebarItem
              icon={<FileText size={20} />}
              text="Formulário"
              urlText="form"
              isActive={active === "Formulário"}
            />
          </>
        )}

        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Ocorrências"
          urlText="list"
          isActive={active === "Ocorrências"}
        />

        {isUserAdm && (
          <SidebarItem
            icon={<Construction size={20} />}
            text="Sondas"
            urlText="list-rigs"
            isActive={active === "Sondas"}
          />
        )}

        {isUserAdm && (
          <SidebarItem
            icon={<Building2 size={20} />}
            text="Contrato"
            urlText="contracts"
            isActive={active === "Contrato"}
          />
        )}

        {isUserAdm && (
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Usuários"
            urlText="users"
            isActive={active === "Usuários"}
          />
        )}

        {isUserAdm && (
          <SidebarItem
            icon={<ArchiveX size={20} />}
            text="Deleção"
            urlText="deletion-requests"
            isActive={active === "Deleção"}
          />
        )}

        <SidebarItem
          icon={<StickyNote size={20} />}
          text="Relatórios"
          urlText="reports"
          isActive={active === "Relatórios"}
        />
      </Sidebar> */}

      <NNavBar />
      <Outlet />
    </div>
  );
};
