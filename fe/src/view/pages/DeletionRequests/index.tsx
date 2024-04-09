import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {useDeletionRequestsController} from "./useDeletionRequestsController";
import {Select} from "../../components/Select";
import {Button} from "../../components/Button";
import {formatDate} from "../../../app/utils/formatDate";
import {ReasonModal} from "./components/ReasonModal";
import {NotFound} from "../../components/NotFound";
import {Link} from "react-router-dom";

export const DeletionRequests = () => {
  const {
    deletionRequests,
    isFetchingDeletionsRequests,
    handleStatusChange,
    filters,
    selectOptions,
    handleApplyFilters,
    translanteStatus,
    openReasonModal,
    isReasonModalOpen,
    closeReasonModal,
    reasonTextModal,
    handleRejectRequest,
  } = useDeletionRequestsController();

  return (
    <>
      <ReasonModal
        onClose={closeReasonModal}
        title="Motivo"
        open={isReasonModalOpen}
        description={reasonTextModal}
      />

      <div className="w-full h-full overflow-y-scroll">
        <Header
          title="USUÁRIOS"
          subtitle="Listagem de todos os usuários cadastrados no sistema"
        />

        <div className="w-full  flex justify-end gap-4 px-4">
          <Select
            className="w-[150px]"
            value={filters.status}
            placeholder="Status"
            options={selectOptions}
            onChange={handleStatusChange}
          />
          <Button
            className="h-[52px]"
            onClick={handleApplyFilters}
            disabled={isFetchingDeletionsRequests}
            isLoading={isFetchingDeletionsRequests}
          >
            Aplicar Filtros
          </Button>
        </div>

        <div className="w-full h-full ">
          <div className="border border-b-2">
            <h1 className="text-xl text-primary pl-8">Pedidos de Deleção</h1>
            {isFetchingDeletionsRequests && (
              <div className="flex justify-center items-center h-1/2">
                <Spinner />
              </div>
            )}

            {!isFetchingDeletionsRequests && deletionRequests.length < 1 && (
              <NotFound>
                <strong>Não</strong> existem pedidos pendentes com os{" "}
                <strong>filtros selecionados!</strong>{" "}
              </NotFound>
            )}

            {!isFetchingDeletionsRequests && deletionRequests && (
              <div className="p-8 flex flex-col h-full gap-4 lg:items-center">
                {deletionRequests.map((deletionRequest) => (
                  <div
                    key={deletionRequest.id}
                    className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex-col flex h-60 justify-between border-l-4  border-primary lg:w-3/4"
                  >
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Criado por
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {deletionRequest.user.name}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Criação
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {formatDate(new Date(deletionRequest.createdAt))}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between w-full">
                      <div className="flex flex-col">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Status
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {translanteStatus(deletionRequest.status)}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Sonda
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {deletionRequest.efficiency.rig?.name}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Data do Registro
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block text-right">
                          {formatDate(
                            new Date(
                              deletionRequest.efficiency.date as
                                | string
                                | number
                                | Date
                            )
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col">
                        <span
                          className="text-primary tracking-[-0.5] underline font-semibold cursor-pointer"
                          onClick={() =>
                            openReasonModal(deletionRequest.reason)
                          }
                        >
                          Ver Motivo
                        </span>
                      </div>

                      <div className="flex ">
                        <Link to={`/details/${deletionRequest.efficiency.id}`}>
                          <span className="text-primary tracking-[-0.5] underline font-semibold cursor-pointer">
                            Ver Registro
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-end items-center w-full">
                      <span
                        className="text-red-400 tracking-[-0.5] underline font-semibold cursor-pointer"
                        onClick={() => handleRejectRequest(deletionRequest)}
                      >
                        Rejeitar Pedido
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
