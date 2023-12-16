import {useAuth} from "../../../app/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useRigs} from "../../../app/hooks/rigs/useRigs";
import {Rig} from "../../../app/entities/Rig";
import {useState} from "react";

export const useListRigs = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  const [rigBeingEdited, setRigBeingEdited] = useState<Rig | null>(null);

  const [isEditRigModalOpen, setEditRigModalOpen] = useState(false);

  const isUserAdm = user?.accessLevel === "ADM";

  console.log("is Modal Open?", isEditRigModalOpen);
  console.log("is Modal Open?", rigBeingEdited);

  const {isFetchingRigs, refetchRigs, rigs} = useRigs(isUserAdm);

  const handleSetRigBeingEdited = (rigId: string) => {
    const rig = rigs.find((rig) => rig.id === rigId);

    if (!rig) {
      setRigBeingEdited(null);
      console.log("null");
      return;
    }

    setRigBeingEdited(rig);
    setEditRigModalOpen(true);
  };

  const handleCloseEditRigModal = () => {
    setRigBeingEdited(null);
    setEditRigModalOpen(false);
  };

  return {
    isFetchingRigs,
    refetchRigs,
    rigs,
    navigate,
    handleSetRigBeingEdited,
    rigBeingEdited,
    isEditRigModalOpen,
    handleCloseEditRigModal,
  };
};
