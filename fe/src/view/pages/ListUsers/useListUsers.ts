import {useNavigate} from "react-router-dom";
import {useUsers} from "../../../app/hooks/useUsers";
import {useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";

export const useListUsers = () => {
  const navigate = useNavigate();
  const [filters] = useState({contractId: ""});
  const {isUserAdm} = useAuth();

  const {users, isFetchingUsers} = useUsers(filters, isUserAdm);

  console.log(users);

  return {
    users,
    isFetchingUsers,
    navigate,
  };
};
