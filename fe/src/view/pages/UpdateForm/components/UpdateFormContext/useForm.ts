import {useContext} from "react";
import {UpdateFormContext} from ".";

export const useForm = () => {
  return useContext(UpdateFormContext);
};
