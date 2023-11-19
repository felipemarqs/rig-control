import { Modal } from "../../../components/Modal";
interface ReasonModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  description: string;
}

export const ReasonModal = ({
  open,
  onClose,
  title,
  description,
}: ReasonModalProps) => {
  return (
    <Modal title={title} open={open} onClose={onClose}>
      <div className="w-full ">
        <p className="break-words text-gray-700">{description}</p>
      </div>
    </Modal>
  );
};
