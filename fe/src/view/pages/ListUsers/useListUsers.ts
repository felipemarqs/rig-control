import {useNavigate} from "react-router-dom";
import {useUsers} from "../../../app/hooks/users/useUsers";
import {ChangeEvent, useMemo, useState} from "react";
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

  console.log(
    "users",
    users.forEach((user) =>
      console.log(Number(new Date(user.userLog[0].loginTime)))
    )
  );

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOrderByLastLogin = (orderBy: OrderByLastLogin) => {
    setOrderByLastLogin(orderBy);
  };

  const filteredUsers = useMemo(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    const sort = filteredUsers.sort((userA, userB) => {
      if (orderByLastLogin === "ASC") {
        return (
          Number(new Date(userA.userLog[0].loginTime)) -
          Number(new Date(userB.userLog[0].loginTime))
        );
      }

      return (
        Number(new Date(userB.userLog[0].loginTime)) -
        Number(new Date(userA.userLog[0].loginTime))
      );
    });

    return sort;
  }, [searchTerm, users, orderByLastLogin]);

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
