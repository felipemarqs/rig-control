import {Outlet} from "react-router-dom";
import {
  BarChart3,
  LayoutDashboard,
  UserCircle,
  FileText,
  CircleDollarSignIcon,
  ArchiveX,
  Building2,
  Construction,
} from "lucide-react";

import {useSidebarContext} from "../../../app/contexts/SidebarContext";
import {useAuth} from "../../../app/hooks/useAuth";
import {Navbar} from "../../components/Navbar";
import {NavbarItem} from "../../components/NavbarItem";

export const MobileLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  const {active} = useSidebarContext();
  const {isUserAdm, userAccessLevel} = useAuth();
  return (
    <div className="w-screen h-screen">
      <Navbar>
        <NavbarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          urlText="dashboard"
          isActive={active === "Dashboard"}
        />

        {isUserAdm && (
          <NavbarItem
            icon={<CircleDollarSignIcon size={20} />}
            text="Faturamento"
            urlText="invoicing-dashboard"
            isActive={active === "Faturamento"}
          />
        )}

        {userAccessLevel !== "VIEWER" ||
          ("ADM" && (
            <NavbarItem
              icon={<FileText size={20} />}
              text="Formulário"
              urlText="form"
              isActive={active === "Formulário"}
            />
          ))}

        <NavbarItem
          icon={<BarChart3 size={20} />}
          text="Ocorrências"
          urlText="list"
          isActive={active === "Ocorrências"}
        />

        {isUserAdm && (
          <NavbarItem
            icon={<Construction size={20} />}
            text="Sonda"
            urlText="rig"
            isActive={active === "Sonda"}
          />
        )}

        {isUserAdm && (
          <NavbarItem
            icon={<Building2 size={20} />}
            text="Contrato"
            urlText="contracts"
            isActive={active === "Contrato"}
          />
        )}

        {isUserAdm && (
          <NavbarItem
            icon={<UserCircle size={20} />}
            text="Usuários"
            urlText="users"
            isActive={active === "Usuários"}
          />
        )}

        {isUserAdm && (
          <NavbarItem
            icon={<ArchiveX size={20} />}
            text="Deleção"
            urlText="deletion-requests"
            isActive={active === "Deleção"}
          />
        )}
      </Navbar>

      <Outlet />
    </div>
  );
};
