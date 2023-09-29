import {useState} from "react";
import {useEfficiencyById} from "../../../app/hooks/useEfficiencyById";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {efficienciesService} from "../../../app/services/efficienciesService";
import {customColorToast} from "../../../app/utils/customColorToast";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

export const useDetailsController = (efficiencyId: string) => {
  const {efficiency, isFetchingEfficiency} = useEfficiencyById(efficiencyId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [modalDescription, setModalDescription] = useState<string>("");

  const {
    isLoading: isLoadingRemoveEfficiency,
    mutateAsync: mutateAsyncRemoveEfficiency,
  } = useMutation(efficienciesService.remove);

  const handleDeleteEfficiency = async () => {
    try {
      await mutateAsyncRemoveEfficiency(efficiencyId);
      queryClient.invalidateQueries({queryKey: ["efficiencies"]});
      customColorToast("Dados Deletados com Sucesso!", "#1c7b7b", "success");
      closeDeleteModal();
      navigate("/dashboard");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  };

  const closeDetailModal = () => {
    setModalDescription("");
    setIsDetailModalOpen(false);
  };

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDescription("");
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return {
    isFetchingEfficiency,
    efficiency,
    isDetailModalOpen,
    closeDetailModal,
    openDetailModal,
    modalDescription,
    closeDeleteModal,
    openDeleteModal,
    isDeleteModalOpen,
    isLoadingRemoveEfficiency,
    handleDeleteEfficiency,
  };
};
