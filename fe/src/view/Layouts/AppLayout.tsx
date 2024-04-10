import { Outlet } from "react-router-dom";
import { NewNavbar } from "@/view/components/NewNavBar";

export const AppLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  //const {isUserAdm, userAccessLevel} = useAuth();
  return (
    <div className=" w-full h-full flex flex-col">
      <NewNavbar />
      <Outlet />
    </div>
  );
};
