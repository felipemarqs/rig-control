import {useContext} from "react";
import {ListRigsContext} from ".";

export const useListRigs = () => {
  return useContext(ListRigsContext);
};
