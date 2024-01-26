import {useNavigate} from "react-router-dom";

export const useInvoicingMenu = () => {
  const navigate = useNavigate();

  return {
    navigate,
  };
};
