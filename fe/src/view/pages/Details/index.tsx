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
          canUserEdit,
          efficiencyId,
          closeDeletionRequestModal,
          isDeletionRequestModalOpen,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="DETALHES" subtitle={`Detalhes da  Operação`} />
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

                    <div className="flex gap-1">
                      <h1 className="text-xl font-bold text-primary-500">
                        Sonda:
                      </h1>
                      <h2 className="text-lg text-secondary-500">
                        {efficiency.rig.name}
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
            <div className="w-full h-full  lg:mx-5 lg:mt-5 max-w-[1400px] min-w-[1000px] flex justify-start items-center gap-4 flex-col">
              {isFetchingEfficiency && (
                <div className="w-full h-full bg-primary-500 p-2 rounded-md flex justify-center items-center lg:w-[70vw] lg:h-[70vh]">
                  <Spinner className="h-12 w-12" />
                </div>
              )}

              {!isFetchingEfficiency &&
                efficiency &&
                !(efficiency instanceof Array) && (
                  <div className="w-full h-[70vh] bg-primary-200 p-2 rounded-md flex justify-center items-center lg:w-[70vw] ">
                    {/* <ListEfficienciesDataGrid data={efficiencies} isDashboard={false} /> */}
                    <PeriodsDataGrid
                      data={efficiency}
                      openDetailModal={openDetailModal}
                    />
                  </div>
                )}
              {canUserEdit && (
                <div className="flex justify-between w-3/4 lg:w-1/2">
                  <Button
                    onClick={openDeleteModal}
                    className="bg-redAccent-500 hover:bg-redAccent-300"
                  >
                    Deletar Registro
                  </Button>

                  <Button>
                    <Link to={`/form/${efficiencyId}`}>
                      <span className="text-white tracking-[-0.5]  font-semibold cursor-pointer">
                        Editar Registro
                      </span>
                    </Link>
                  </Button>
                </div>
              )}

              {/*   {!isUserAdm && (
                <Button
                  onClick={openDeletionRequestModal}
                  className="bg-redAccent-500"
                >
                  Solicitar Exclusão
                </Button>
              )} */}
            </div>
          </div>
        )}
      </DetailsContext.Consumer>
    </DetailsContextProvider>
  );
};
