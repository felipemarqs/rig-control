import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {DetailsModal} from "./components/DetailsModal";
import {PeriodsDataGrid} from "./components/PeriodsDataGrid";
import {useDetailsController} from "./useDetailsController";
import {useParams} from "react-router-dom";

export const Details = () => {
  const {efficiencyId} = useParams();

  const {
    isFetchingEfficiency,
    efficiency,
    isDetailModalOpen,
    closeDetailModal,
    openDetailModal,
    modalDescription,
  } = useDetailsController(efficiencyId!);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="LISTAGEM" subtitle="Listagem de efficienciências" />
      <DetailsModal
        onClose={closeDetailModal}
        open={isDetailModalOpen}
        description={modalDescription}
      />
      <div className="w-full h-full  mx-5 mt-5 max-w-[1400px] flex justify-center  ">
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
      </div>
    </div>
  );
};
