import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {RequestStatus} from "../../../app/entities/RequestStatus";
import {useDeletionRequests} from "../../../app/hooks/useDeletionRequests";
import {deletionRequestsServices} from "../../../app/services/deletionRequestsServices";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DeletionRequest} from "../../../app/entities/DeletionRequest";

export const useDeletionRequestsController = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({status: RequestStatus.PENDING});
  const [reasonTextModal, setReasonTextModal] = useState("");
  const requestStatusTraslated = {
    PENDENTE: "PENDING",
    FINALIZADO: "FINISHED",
    REJEITADO: "REJECTED",
  };

  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);

  const closeReasonModal = () => {
    setIsReasonModalOpen(false);
    setReasonTextModal("");
  };

  const openReasonModal = (reason: string) => {
    setIsReasonModalOpen(true);
    setReasonTextModal(reason);
  };

  const {
    deletionRequests,
    isFetchingDeletionsRequests,
    refetchDeletionsRequests,
  } = useDeletionRequests(filters);

  const selectOptions = Object.entries(requestStatusTraslated).map(
    ([key, value]) => ({
      value,
      label: key,
    })
  );

  const translanteStatus = (status: RequestStatus) => {
    const res = selectOptions.find(({value}) => value === status)!;

    return res.label;
  };

  const handleStatusChange = (value: RequestStatus) => {
    setFilters({status: value});
  };

  const handleApplyFilters = () => {
    refetchDeletionsRequests();
  };

  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({
    mutationFn: deletionRequestsServices.update,
  });

  const handleRejectRequest = (deletionRequest: DeletionRequest) => {
    try {
      mutateAsync({
        id: deletionRequest.id!,
        efficiencyId: deletionRequest.efficiency.id!,
        reason: deletionRequest.reason,
        status: RequestStatus.REJECTED,
      });

      queryClient.invalidateQueries({queryKey: ["deletion-requests"]});
      handleApplyFilters();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
  };

  return {
    deletionRequests,
    isFetchingDeletionsRequests,
    refetchDeletionsRequests,
    navigate,
    selectOptions,
    filters,
    handleStatusChange,
    translanteStatus,
    handleApplyFilters,
    isReasonModalOpen,
    closeReasonModal,
    openReasonModal,
    reasonTextModal,
    handleRejectRequest,
  };
};
