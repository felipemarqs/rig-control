import {useContext} from "react";
import {RigsDashboardContext} from ".";

export const useDashboard = () => {
  return useContext(RigsDashboardContext);
};
