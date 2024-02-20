import {useContext} from "react";
import {FiltersContext} from "../contexts/FiltersContext";

export const useFiltersContext = () => useContext(FiltersContext);
