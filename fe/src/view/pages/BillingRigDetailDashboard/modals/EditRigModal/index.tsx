import {Modal} from "../../../../components/Modal";
import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const EditRigModal = () => {
  const {isEditRigModalOpen, handleCloseEditRigModal} =
    useBillingRigDetailDashboard();

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
