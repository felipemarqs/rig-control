import {useNavigate} from "react-router-dom";
import {useUsers} from "../../../app/hooks/useUsers";
import {useState} from "react";

export const useListUsers = () => {
  const navigate = useNavigate();
  const [filters] = useState({contractId: ""});

  const {users, isFetchingUsers} = useUsers(filters);

  return {
    users,
    isFetchingUsers,
    navigate,
  };
};
