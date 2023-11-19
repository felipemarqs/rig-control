import {useContext} from "react";
import {DetailsContext} from ".";

export const useDetails = () => {
  return useContext(DetailsContext);
};
