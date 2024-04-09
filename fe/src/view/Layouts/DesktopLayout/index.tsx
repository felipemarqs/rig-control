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
import {NewNavbar} from "@/view/components/NewNavBar";

export const DesktopLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  const {active} = useSidebarContext();
  //const {isUserAdm, userAccessLevel} = useAuth();
  return (
    <div className=" w-full h-full flex flex-col">
      <NewNavbar />
      <Outlet />
    </div>
  );
};
