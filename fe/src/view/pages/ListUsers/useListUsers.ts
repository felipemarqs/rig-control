import {useNavigate} from "react-router-dom";
import {useUsers} from "../../../app/hooks/users/useUsers";
import {ChangeEvent, useMemo, useRef, useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";

export const useListUsers = () => {
  const navigate = useNavigate();
  const [filters] = useState({contractId: ""});
  const {isUserAdm} = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [orderByLastLogin, setOrderByLastLogin] =
    useState<OrderByLastLogin | null>(null);

  type OrderByLastLogin = "ASC" | "DESC";

  const {users, isFetchingUsers} = useUsers(filters, isUserAdm);

  console.log("Users", JSON.stringify(users));

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event", event);
    setSearchTerm(event.target.value);
  };

  const handleOrderByLastLogin = (orderBy: OrderByLastLogin) => {
    setOrderByLastLogin(orderBy);
  };

  const filteredUsers = useMemo(() => {
    const filteredUsers = users
      .filter((user) =>
        user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
      .sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

    return filteredUsers;
  }, [searchTerm, users]);

  const hasUsers = filteredUsers.length > 0;

  return {
    users,
    navigate,
    hasUsers,
    searchTerm,
    filteredUsers,
    isFetchingUsers,
    orderByLastLogin,
    handleOrderByLastLogin,
    handleChangeSearchTerm,
  };
};
