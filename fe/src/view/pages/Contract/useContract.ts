import { useContracts } from "../../../app/hooks/contracts/useContracts";
import { useAuth } from "../../../app/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useContract = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isUserAdm = user?.accessLevel === "ADM";

  const { contracts, isFetchingContracts } = useContracts(isUserAdm);

  return {
    contracts,
    isFetchingContracts,
    navigate,
  };
};
