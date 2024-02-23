import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../app/hooks/useAuth";

export const useDashboardMenu = () => {
  const navigate = useNavigate();

  const {isUserAdm} = useAuth();

  return {
    navigate,
    isUserAdm,
  };
};
