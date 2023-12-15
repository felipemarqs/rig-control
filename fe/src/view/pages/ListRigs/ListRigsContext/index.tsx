import {createContext, useState} from "react";
import {useAuth} from "../../../../app/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {Rig} from "../../../../app/entities/Rig";
import {useRigs} from "../../../../app/hooks/rigs/useRigs";

interface useListContextValues {
  isFetchingRigs: boolean;
  refetchRigs: () => void; // Coloque o tipo de retorno apropriado, se houver
  rigs: Rig[]; // Supondo que 'Rig' seja um tipo definido em algum lugar do código
  navigate: (to: string) => void; // Coloque o tipo de retorno apropriado, se houver
  handleSetRigBeingEdited: (rigId: string) => void;
  rigBeingEdited: Rig | null; // Supondo que 'Rig' seja um tipo definido em algum lugar do código
  isEditRigModalOpen: boolean;
  handleCloseEditRigModal: () => void;
}

export const ListRigsContext = createContext({} as useListContextValues);

export const ListRigsProvider = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [rigBeingEdited, setRigBeingEdited] = useState<Rig | null>(null);
  const [isEditRigModalOpen, setEditRigModalOpen] = useState(false);

  const isUserAdm = user?.accessLevel === "ADM";

  const {isFetchingRigs, refetchRigs, rigs} = useRigs(isUserAdm);

  const handleSetRigBeingEdited = (rigId: string) => {
    const rig = rigs.find((rig) => rig.id === rigId);

    if (!rig) {
      setRigBeingEdited(null);
      return;
    }

    setRigBeingEdited(rig);
    setEditRigModalOpen(true);
  };

  const handleCloseEditRigModal = () => {
    setRigBeingEdited(null);
    setEditRigModalOpen(false);
  };

  return (
    <ListRigsContext.Provider
      value={{
        isFetchingRigs,
        refetchRigs,
        rigs,
        navigate,
        handleSetRigBeingEdited,
        rigBeingEdited,
        isEditRigModalOpen,
        handleCloseEditRigModal,
      }}
    >
      {children}
    </ListRigsContext.Provider>
  );
};
