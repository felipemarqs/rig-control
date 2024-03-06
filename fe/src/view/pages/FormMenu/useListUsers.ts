import {useNavigate} from "react-router-dom";
import {useUsers} from "../../../app/hooks/users/useUsers";
import {useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";
import {useTemporaryEfficiencyById} from "../../../app/hooks/temporaryEfficiencies/useTemporaryEfficiencyById";
import {useTemporaryEfficiencyByUserId} from "../../../app/hooks/temporaryEfficiencies/useTemporaryEfficiencyByUserId";

export const useListUsers = () => {
  const navigate = useNavigate();

  const {user} = useAuth();

  const {temporaryEfficiencies, isFetchingTemporaryEfficiencies} =
    useTemporaryEfficiencyByUserId(user?.id!);

  console.log("Temporary Efficiencies", temporaryEfficiencies);

  return {
    temporaryEfficiencies,
    navigate,
    isFetchingTemporaryEfficiencies,
  };
};
