import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";
import {useTemporaryEfficiencyByUserId} from "../../../app/hooks/temporaryEfficiencies/useTemporaryEfficiencyByUserId";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {temporaryEfficienciesServices} from "../../../app/services/temporaryEfficienciesServices";
import {QueryKeys} from "../../../app/config/QueryKeys";
import {customColorToast} from "../../../app/utils/customColorToast";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";

export const useFormMenu = () => {
  const navigate = useNavigate();

  const {user} = useAuth();

  const queryClient = useQueryClient();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const {temporaryEfficiency, isFetchingTemporaryEfficiencies} =
    useTemporaryEfficiencyByUserId(user?.id!);

  console.log("Temporary Efficiencies", temporaryEfficiency);

  const hasData = !Array.isArray(temporaryEfficiency);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const {
    isPending: isLoadingRemoveEfficiency,
    mutateAsync: mutateAsyncRemoveEfficiency,
  } = useMutation({mutationFn: temporaryEfficienciesServices.remove});

  const handleDeleteEfficiency = async () => {
    if (hasData) {
      try {
        await mutateAsyncRemoveEfficiency(temporaryEfficiency.id);
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.TEMPORARY_EFFICIENCY],
        });
        customColorToast("Dados Deletados com Sucesso!", "#1c7b7b", "success");
        closeDeleteModal();
      } catch (error: any | typeof AxiosError) {
        treatAxiosError(error);
      }
    }
  };

  return {
    temporaryEfficiency,
    navigate,
    isFetchingTemporaryEfficiencies,
    isDeleteModalOpen,
    closeDeleteModal,
    openDeleteModal,
    handleDeleteEfficiency,
    isLoadingRemoveEfficiency,
    hasData,
  };
};
