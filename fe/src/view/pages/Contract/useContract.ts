import {useContracts} from "../../../app/hooks/contracts/useContracts";
import {useAuth} from "../../../app/hooks/useAuth";
import {useNavigate} from "react-router-dom";

export const useContract = () => {
  const {isUserAdm} = useAuth();
  const navigate = useNavigate();

  const {contracts, isFetchingContracts} = useContracts(isUserAdm);

  return {
    contracts,
    isFetchingContracts,
    navigate,
  };
};
