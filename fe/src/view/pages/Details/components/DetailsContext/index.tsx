import {createContext, useState} from "react";
import {customColorToast} from "../../../../../app/utils/customColorToast";
import {PersistanceEfficiency} from "../../../../../app/entities/PersistanceEfficiency";
import {useEfficiencyById} from "../../../../../app/hooks/useEfficiencyById";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../../../app/hooks/useAuth";
import {efficienciesService} from "../../../../../app/services/efficienciesService";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../../../app/utils/treatAxiosError";

interface DetailsContextValues {
  isFetchingEfficiency: boolean;
  efficiency: never[] | PersistanceEfficiency;
  isDetailModalOpen: boolean;
  closeDetailModal: () => void;
  openDetailModal: (description: string) => void;
  modalDescription: string;
  closeDeleteModal: () => void;
  openDeleteModal: () => void;
  isDeleteModalOpen: boolean;
  isLoadingRemoveEfficiency: boolean;
  handleDeleteEfficiency: () => Promise<void>;
  isUserAdm: boolean;

  closeDeletionRequestModal: () => void;
  openDeletionRequestModal: () => void;
  isDeletionRequestModalOpen: boolean;
  efficiencyId: string;
}
export const DetailsContext = createContext({} as DetailsContextValues);

export const DetailsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {efficiencyId} = useParams<{efficiencyId: string}>();

  if (typeof efficiencyId === "undefined") {
    // Trate o erro de acordo com a necessidade do seu aplicativo
    // Pode ser um redirecionamento, um erro lançado, ou até mesmo um log.
    throw new Error("efficiencyId is undefined");
  }

  const {efficiency, isFetchingEfficiency} = useEfficiencyById(efficiencyId!);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {isUserAdm} = useAuth();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeletionRequestModalOpen, setIsDeletionRequestModalOpen] =
    useState<boolean>(false);

  const [modalDescription, setModalDescription] = useState<string>("");

  const {
    isLoading: isLoadingRemoveEfficiency,
    mutateAsync: mutateAsyncRemoveEfficiency,
  } = useMutation(efficienciesService.remove);

  const handleDeleteEfficiency = async () => {
    try {
      await mutateAsyncRemoveEfficiency(efficiencyId!);
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

  const openDetailModal = (description: string) => {
    setModalDescription(description.length > 0 ? description : "Sem Descrição");
    setIsDetailModalOpen(true);
  };

  const closeDeletionRequestModal = () => {
    setIsDeletionRequestModalOpen(false);
  };

  const openDeletionRequestModal = () => {
    setIsDeletionRequestModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDescription("");
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <DetailsContext.Provider
      value={{
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
        isUserAdm,
        efficiencyId,
        closeDeletionRequestModal,
        openDeletionRequestModal,
        isDeletionRequestModalOpen,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
