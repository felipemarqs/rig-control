import {Outlet, useNavigate} from "react-router-dom";
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
import {Navbar} from "../../components/Navbar";
import {NavbarItem} from "../../components/NavbarItem";
import {Button} from "../../components/Button";

export const MobileLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  const navigate = useNavigate();
  const {active} = useSidebarContext();
  const {isUserAdm, userAccessLevel, user, signout} = useAuth();
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
            urlText="invoicing"
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
            text="Sondas"
            urlText="list-rigs"
            isActive={active === "Sondas"}
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

        {isUserAdm && (
          <NavbarItem
            icon={<StickyNote size={20} />}
            text="Relatórios"
            urlText="reports"
            isActive={active === "Relatórios"}
          />
        )}

        <div className="border-t flex justify-between items-center p-3">
          <div
            onClick={() => navigate(`/users/${user?.id}`)}
            className={`
              overflow-hidden cursor-pointer transition-all 
          `}
          >
            <div className="leading-4">
              <h4 className="text-white font-semibold">{user?.name}</h4>
              <span className="text-xs  text-white">
                {user?.accessLevel === "ADM"
                  ? "ADMINISTRADOR"
                  : user?.rigs[0].rig.name}
              </span>
            </div>
          </div>

          <Button className="p-2 bg-primary" onClick={() => signout()}>
            Sair
          </Button>
        </div>
      </Navbar>

      <Outlet />
    </div>
  );
};
