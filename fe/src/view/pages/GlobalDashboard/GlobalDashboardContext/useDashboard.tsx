import {useContext} from "react";
import {GlobalDashboardContext} from ".";

export const useGlobalDashboard = () => {
  return useContext(GlobalDashboardContext);
};
