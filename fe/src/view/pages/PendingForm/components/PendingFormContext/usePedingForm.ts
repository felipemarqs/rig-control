import {useContext} from "react";
import {PendingFormContext} from ".";

export const usePendingForm = () => {
  return useContext(PendingFormContext);
};
