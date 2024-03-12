import {formatDate} from "../../../../../app/utils/formatDate";
import {Button} from "../../../../components/Button";
import {Modal} from "../../../../components/Modal";
import {usePendingForm} from "../PendingFormContext/usePedingForm";

export const AlertModal = () => {
  const {
    isModalOpen,
    closeModal,
    temporaryEfficiency,
    handleConfirmModal,
    isLoading,
  } = usePendingForm();
  return (
    <Modal
      title="Aviso!!"
      maxWidth="1000px"
      open={isModalOpen}
      onClose={closeModal}
    >
      <div className="text-gray-600 flex items-center ">
        <div className=" flex-1 space-y-3">
          <p className="tracking-[-0.5px] text-gray-800 w-full text-center">
            Você já tem um boletim salvo. Ao salvar este, ele irá{" "}
            <span className="text-redAccent-500 font-bold">sobrescrever</span> o
            registro salvo anteriormente.
          </p>

          <p className="tracking-[-0.5px] text-gray-800 w-full text-center">
            Registro salvo:
          </p>
          <div className="p-4 flex flex-col gap-2 rounded-md shadow-[0_0_4px] justify-between">
            {temporaryEfficiency && !Array.isArray(temporaryEfficiency) && (
              <div className="flex">
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Data:
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {formatDate(new Date(temporaryEfficiency.date))}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Poço:
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {temporaryEfficiency.well}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Horas Disponíveis:
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {temporaryEfficiency.availableHours}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Quantidade de períodos:
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {temporaryEfficiency.temporaryPeriods.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 space-y-4">
            <Button
              className="w-full"
              onClick={handleConfirmModal}
              isLoading={isLoading}
            >
              Sim, desejo salvar
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleConfirmModal}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
