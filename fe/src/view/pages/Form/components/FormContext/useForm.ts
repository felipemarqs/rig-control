import {useContext} from "react";
import {FormContext} from ".";

export const useForm = () => {
  return useContext(FormContext);
};
