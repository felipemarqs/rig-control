import {useContext} from "react";
import {ReportContext} from ".";

export const useReport = () => {
  return useContext(ReportContext);
};
