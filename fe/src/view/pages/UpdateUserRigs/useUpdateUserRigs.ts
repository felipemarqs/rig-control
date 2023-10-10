import {useEffect, useMemo, useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";
import {useUsers} from "../../../app/hooks/useUsers";

import {useContracts} from "../../../app/hooks/useContracts";

interface Rig {
  id: string;
  name: string;
  isActive: boolean | undefined;
}

export const useUpdateUserRigs = (id: string) => {
  const {user} = useAuth();

  const [filters] = useState({contractId: ""});

  const [userRigs, setUserRigs] = useState<Array<Rig>>([]);
  const [availableRigs, setAvailableRigs] = useState<Array<Rig>>([]);

  const isUserAdm = user?.accessLevel === "ADM";
  const {contracts, isFetchingContracts} = useContracts(isUserAdm);

  const {users, isFetchingUsers} = useUsers(filters);

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

  return {
    user,
    isLoading: isFetchingUsers || isFetchingContracts,
    userBeingEdited,
    userRigs,
    availableRigs,
    handleLinkRig,
    handleUnlinkRig,
  };
};
