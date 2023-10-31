import {useEffect, useMemo, useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";
import {useUsers} from "../../../app/hooks/useUsers";

import {useContracts} from "../../../app/hooks/useContracts";
import {useMutation} from "@tanstack/react-query";
import {usersService} from "../../../app/services/usersService";
import {customColorToast} from "../../../app/utils/customColorToast";
import {useNavigate} from "react-router-dom";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";

interface Rig {
  id: string;
  name: string;
  isActive: boolean | undefined;
}

export const useUpdateUserRigs = (id: string) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [filters] = useState({contractId: ""});

  const [userRigs, setUserRigs] = useState<Array<Rig>>([]);
  const [availableRigs, setAvailableRigs] = useState<Array<Rig>>([]);

  const isUserAdm = user?.accessLevel === "ADM";
  const {contracts, isFetchingContracts} = useContracts(isUserAdm);

  const {users, isFetchingUsers} = useUsers(filters);

  const {isLoading: isLoadingUpdateRigs, mutateAsync} = useMutation(
    usersService.updateRigs
  );

  const userBeingEdited = useMemo(() => {
    return users.find((user) => user.id === id);
  }, [id]);

  useEffect(() => {
    const userRigs = userBeingEdited?.rigs.map(
      ({rig: {id, name, isAtive}}) => ({
        id,
        name,
        isActive: isAtive,
      })
    )!;

    const userContract = contracts.find(
      //@ts-ignore
      (contract) => userBeingEdited?.contract[0].contractId === contract.id
    );
    [];
    const contractRigs = userContract
      ? userContract?.rigs.map(({id, name, isActive}) => ({
          id,
          name,
          isActive,
        }))!
      : [];

    const availableRigs = contractRigs
      ? contractRigs.filter(
          (rig) => !userRigs.some((userRig) => userRig.id === rig.id)
        )
      : [];

    setAvailableRigs(availableRigs);

    setUserRigs(userRigs);
  }, []);

  const handleLinkRig = (rigId: string) => {
    const rig = availableRigs.find((rig) => rig.id === rigId)!;
    setAvailableRigs((prev) => prev.filter((rig) => rig.id !== rigId));
    setUserRigs((prev) => [...prev, rig]);
  };

  const handleUnlinkRig = (rigId: string) => {
    const rig = userRigs.find((rig) => rig.id === rigId)!;
    setUserRigs((prev) => prev.filter((rig) => rig.id !== rigId));
    setAvailableRigs((prev) => [...prev, rig]);
  };

  const handleSubmit = async () => {
    const rigsToPersistence = userRigs.map(({id}) => id);
    const userId = userBeingEdited?.id!;
    /*     console.log("userRigs: ", userRigs);
    console.log("userId: ", userId);
    console.log("rigsToPersistence: ", rigsToPersistence); */
    const body = {userId, rigs: rigsToPersistence};
    try {
      await mutateAsync(body);
      navigate("/users");
      customColorToast("Sondas editadas com sucesso!", "#1c7b7b", "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
    console.log("body: ", JSON.stringify(body));
  };

  return {
    user,
    isLoading: isFetchingUsers || isFetchingContracts,
    userBeingEdited,
    userRigs,
    availableRigs,
    handleLinkRig,
    handleUnlinkRig,
    handleSubmit,
    isLoadingUpdateRigs,
  };
};
