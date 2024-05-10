import {Outlet} from "react-router-dom";
import {Navbar} from "@/view/components/Navbar";
import {cn} from "@/lib/utils";
import {currentVersion} from "@/app/config/CurrentVersion";

export const SystemVersion = () => {
  return (
    <div
      className={cn(
        "fixed   text-sm text-gray-400 p-1 lg:p-4 z-50 rounded-lg bottom-2 right-5"
      )}
    >
      <span>{currentVersion.version}</span>
    </div>
  );
};

export const AppLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  //const {isUserAdm, userAccessLevel} = useAuth();
  return (
    <div className=" w-full h-full flex flex-col">
      <Navbar />

      <SystemVersion />

      <Outlet />
    </div>
  );
};
