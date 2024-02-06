import {useEffect, useMemo, useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";
import {useUsers} from "../../../app/hooks/users/useUsers";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {usersService} from "../../../app/services/usersService";
import {customColorToast} from "../../../app/utils/customColorToast";
import {useNavigate} from "react-router-dom";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {useRigs} from "../../../app/hooks/rigs/useRigs";
import {useSidebarContext} from "../../../app/contexts/SidebarContext";

interface Rig {
  id: string;
  name: string;
  isActive: boolean | undefined;
}

export const useUpdateUserRigs = (id: string) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [filters] = useState({contractId: ""});
  const {handleToggleNavItem} = useSidebarContext();

  const [userRigs, setUserRigs] = useState<Array<Rig>>([]);
  const [availableRigs, setAvailableRigs] = useState<Array<Rig>>([]);

  const isUserAdm = user?.accessLevel === "ADM";

  const {rigs, isFetchingRigs} = useRigs(isUserAdm);

  const queryClient = useQueryClient();

  const {users, isFetchingUsers} = useUsers(filters);

  const {isPending: isLoadingUpdateRigs, mutateAsync} = useMutation({
    mutationFn: usersService.updateRigs,
  });

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

    const contractRigs = rigs;

    const availableRigs = contractRigs
      ? contractRigs.filter(
          (rig) => !userRigs.some((userRig) => userRig.id === rig.id)
        )
      : [];

    setAvailableRigs(availableRigs);

    setUserRigs(userRigs);
  }, [userBeingEdited, rigs]);

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

    const body = {userId, rigs: rigsToPersistence};
    try {
      await mutateAsync(body);
      navigate("/users");
      handleToggleNavItem("Usuários");
      customColorToast("Sondas editadas com sucesso!", "#1c7b7b", "success");
      queryClient.invalidateQueries({queryKey: ["users"]});
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
  };

  return {
    user,
    isLoading: isFetchingUsers || isFetchingRigs,
    userBeingEdited,
    userRigs,
    availableRigs,
    handleLinkRig,
    handleUnlinkRig,
    handleSubmit,
    isLoadingUpdateRigs,
  };
};
