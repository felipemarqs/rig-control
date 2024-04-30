import { Outlet } from "react-router-dom";
import { Navbar } from "@/view/components/Navbar";

export const AppLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  //const {isUserAdm, userAccessLevel} = useAuth();
  return (
    <div className=" w-full h-full flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
