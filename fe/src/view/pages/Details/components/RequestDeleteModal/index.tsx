import {Button} from "../../../../components/Button";
import {Modal} from "../../../../components/Modal";
import {useRequestDeleteModal} from "./useRequestDeleteModal";
import TextArea from "antd/es/input/TextArea";
import {ErrorContainer} from "../../../../components/ErrorContainer";
import {Controller} from "react-hook-form";

interface RequestDeleteModalProps {
  onClose(): void;

  open: boolean;
  efficiencyId: string;
}
export const RequestDeleteModal = ({
  onClose,
  open,
  efficiencyId,
}: RequestDeleteModalProps) => {
  const {
    isLoadingDeletionRequest,

    errors,
    control,
    handleSubmitDeletionRequest,
  } = useRequestDeleteModal(efficiencyId);

  return (
    <Modal title="Solicitar Exclusão" onClose={onClose} open={open}>
      <p className="text-black">Motivo:</p>
      <Controller
        control={control}
        name="reason"
        render={({field: {onChange, value}}) => (
          <TextArea
            onChange={onChange}
            value={value}
            className="border-2 "
            maxLength={1000}
            style={{
              height: 100,
              resize: "vertical",
              borderColor: "#1C7B7B",
            }}
          />
        )}
      />

      {errors.reason?.message && (
        <ErrorContainer error={errors.reason?.message} />
      )}

      <div className="w-full flex justify-center mt-4">
        <Button
          className="w-1/2"
          disabled={isLoadingDeletionRequest}
          isLoading={isLoadingDeletionRequest}
          onClick={handleSubmitDeletionRequest}
        >
          Enviar
        </Button>
      </div>
    </Modal>
  );
};
