import {useState} from "react";
import {useEfficiencyById} from "../../../app/hooks/useEfficiencyById";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {efficienciesService} from "../../../app/services/efficienciesService";
import {customColorToast} from "../../../app/utils/customColorToast";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../app/hooks/useAuth";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ToPersistenceDeletionRequest} from "../../../app/services/deletionRequestsServices/create";
import {deletionRequestsServices} from "../../../app/services/deletionRequestsServices";

const schema = z.object({
  reason: z.string().nonempty("Motivo é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const useDetailsController = (efficiencyId: string) => {
  const {efficiency, isFetchingEfficiency} = useEfficiencyById(efficiencyId);
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

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {isLoading: isLoadingDeletionRequest, mutateAsync} = useMutation({
    mutationKey: ["deletion-request"],
    mutationFn: async (data: ToPersistenceDeletionRequest) => {
      return await deletionRequestsServices.create(data);
    },
  });

  const handleSubmitDeletionRequest = hookFormHandleSubmit(async (data) => {
    //API Call
    try {
      await mutateAsync({
        efficiencyId,
        ...data,
      });

      customColorToast("Pedido feito com sucesso!", "#1c7b7b", "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  });

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
    isUserAdm,
    register,
    errors,
    isLoadingDeletionRequest,
    handleSubmitDeletionRequest,
    closeDeletionRequestModal,
    openDeletionRequestModal,
  };
};
