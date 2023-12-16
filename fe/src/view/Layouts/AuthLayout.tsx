import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex justify-center pt-5 pb-5 w-full h-full bg-gray-100 ">
      <Outlet />
    </div>
  );
};
