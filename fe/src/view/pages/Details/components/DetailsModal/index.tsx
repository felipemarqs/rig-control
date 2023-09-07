import { Modal } from "../../../../components/Modal";

interface DetailsModalProps {
  onClose(): void;
  open: boolean;
  description: string;
}
export const DetailsModal = ({
  onClose,
  open,
  description,
}: DetailsModalProps) => {
  return (
    <Modal title="Detalhes" onClose={onClose} open={open}>
      <p className="text-black">{description}</p>
    </Modal>
  );
};
