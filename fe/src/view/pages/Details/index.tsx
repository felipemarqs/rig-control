import {
  DetailsContext,
  DetailsContextProvider,
} from "./components/DetailsContext";
import {Header} from "../../components/Header";
import {DetailsModal} from "./components/DetailsModal";
import {DeleteModal} from "../../components/DeleteModal";
import {PeriodsDataGridCard} from "./components/PeriodsDataGridCard";

export const Details = () => {
  return (
    <DetailsContextProvider>
      <DetailsContext.Consumer>
        {({
          isDetailModalOpen,
          closeDetailModal,
          modalDescription,
          closeDeleteModal,
          isDeleteModalOpen,
          isLoadingRemoveEfficiency,
          handleDeleteEfficiency,
        }) => (
          <div className="w-full h-full ">
            <Header
              title="Detalhes da Operação"
              displayRig={false}
              displayPeriodRange={false}
            />

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

            <main className="flex flex-1 flex-col gap-4 px-4 py-2 md:gap-8 ">
              <div className="grid gap-4 md:gap-8 grid-cols-12 auto-rows-[150px]">
                <PeriodsDataGridCard />
              </div>
            </main>
          </div>
        )}
      </DetailsContext.Consumer>
    </DetailsContextProvider>
  );
};
