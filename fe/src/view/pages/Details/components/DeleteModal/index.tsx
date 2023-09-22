import {TrashIcon} from "lucide-react";
import {Modal} from "../../../../components/Modal";
import {Button} from "../../../../components/Button";

interface DeleteModalProps {
  onClose(): void;
  onConfirm(): void;
  isLoading: boolean;
  open: boolean;
  description: string;
  title: string;
}
export const DeleteModal = ({
  onClose,
  open,
  description,
  title,
  onConfirm,
  isLoading,
}: DeleteModalProps) => {
  return (
    <Modal open={open} title="Deletar Registro" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-redAccent-500" />
        </div>
        <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
          {title}
        </p>
        {description && (
          <p className="tracking-[-0.5px] text-gray-800 ">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          variant="danger"
          className="w-full"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};
