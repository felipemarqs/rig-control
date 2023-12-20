import {Link} from "react-router-dom";
import {formatDate} from "../../../app/utils/formatDate";
import {Button} from "../../components/Button";
import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {DeleteModal} from "./components/DeleteModal";
import {
  DetailsContext,
  DetailsContextProvider,
} from "./components/DetailsContext";
import {DetailsModal} from "./components/DetailsModal";
import {PeriodsDataGrid} from "./components/PeriodsDataGrid";
import {RequestDeleteModal} from "./components/RequestDeleteModal";

export const Details = () => {
  return (
    <DetailsContextProvider>
      <DetailsContext.Consumer>
        {({
          isFetchingEfficiency,
          efficiency,
          isDetailModalOpen,
          closeDetailModal,
          openDetailModal,
          modalDescription,
          closeDeleteModal,
          openDeleteModal,
          isDeleteModalOpen,
          isLoadingRemoveEfficiency,
          handleDeleteEfficiency,
          isUserAdm,
          efficiencyId,
          closeDeletionRequestModal,
          openDeletionRequestModal,
          isDeletionRequestModalOpen,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="DETALHES" subtitle="Detalhes da  Operação" />
            <div className="m-4">
              {!isFetchingEfficiency &&
                efficiency &&
                !(efficiency instanceof Array) && (
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <h1 className="text-xl font-bold text-primary-500">
                        Dia:
                      </h1>
                      <h2 className="text-lg text-secondary-500">
                        {formatDate(new Date(efficiency.date))}
                      </h2>
                    </div>

                    <div className="flex gap-1">
                      <h1 className="text-xl font-bold text-primary-500">
                        Poço:
                      </h1>
                      <h2 className="text-lg text-secondary-500">
                        {efficiency.well}
                      </h2>
                    </div>
                  </div>
                )}
            </div>
            <DetailsModal
              onClose={closeDetailModal}
              open={isDetailModalOpen}
              description={modalDescription}
            />

            <DeleteModal
              title=" Tem certeza que deseja excluir esse registro?"
              description="Essa ação NÃO poderá ser desfeita."
              open={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={handleDeleteEfficiency}
              isLoading={isLoadingRemoveEfficiency}
            />

            <RequestDeleteModal
              efficiencyId={efficiencyId}
              open={isDeletionRequestModalOpen}
              onClose={closeDeletionRequestModal}
            />
            <div className="w-full h-full  mx-5 mt-5 max-w-[1400px] flex justify-start items-center gap-4 flex-col">
              {isFetchingEfficiency && (
                <div className="w-[70vw] h-[70vh] bg-primary-500 p-2 rounded-md flex justify-center items-center">
                  <Spinner className="h-12 w-12" />
                </div>
              )}

              {!isFetchingEfficiency &&
                efficiency &&
                !(efficiency instanceof Array) && (
                  <div className="w-[70vw] h-[70vh] bg-primary-200 p-2 rounded-md flex justify-center items-center">
                    {/* <ListEfficienciesDataGrid data={efficiencies} isDashboard={false} /> */}
                    <PeriodsDataGrid
                      data={efficiency}
                      openDetailModal={openDetailModal}
                    />
                  </div>
                )}
              {isUserAdm && (
                <Button onClick={openDeleteModal} className="bg-redAccent-500">
                  Deletar Registro
                </Button>
              )}

              {isUserAdm && (
                <Link to={`/form/${efficiencyId}`}>
                  <span className="text-primary-500 tracking-[-0.5] underline font-semibold cursor-pointer">
                    Editar Registro
                  </span>
                </Link>
              )}

              {!isUserAdm && (
                <Button
                  onClick={openDeletionRequestModal}
                  className="bg-redAccent-500"
                >
                  Solicitar Exclusão
                </Button>
              )}
            </div>
          </div>
        )}
      </DetailsContext.Consumer>
    </DetailsContextProvider>
  );
};
