import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex justify-center pt-10 w-full h-full bg-gray-300 ">
      <Outlet />
    </div>
  );
};
