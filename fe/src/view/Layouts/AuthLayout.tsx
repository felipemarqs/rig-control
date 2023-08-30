import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex justify-center pt-10 w-full min-h-full bg-gray-100 ">
      <Outlet />
    </div>
  );
};
