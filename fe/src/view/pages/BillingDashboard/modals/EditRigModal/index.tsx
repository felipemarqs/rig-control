import {Modal} from "../../../../components/Modal";
import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const EditRigModal = () => {
  const {isEditRigModalOpen, handleCloseEditRigModal} = useBillingDashboard();

  return (
    <Modal
      title="Editar Sonda"
      open={isEditRigModalOpen}
      onClose={handleCloseEditRigModal}
    >
      <form>
        <div></div>
      </form>
    </Modal>
  );
};
