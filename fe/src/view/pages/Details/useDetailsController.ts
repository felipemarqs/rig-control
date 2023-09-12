import { useState } from "react";
import { useEfficiencyById } from "../../../app/hooks/useEfficiencyById";

export const useDetailsController = (efficiencyId: string) => {
  const { efficiency, isFetchingEfficiency } = useEfficiencyById(efficiencyId);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [modalDescription, setModalDescription] = useState<string>("");

  const closeDetailModal = () => {
    setModalDescription("");
    setIsDetailModalOpen(false);
  };

  const openDetailModal = (description: string) => {
    setIsDetailModalOpen(true);
    setModalDescription(description);
  };

  return {
    isFetchingEfficiency,
    efficiency,
    isDetailModalOpen,
    closeDetailModal,
    openDetailModal,
    modalDescription,
  };
};
