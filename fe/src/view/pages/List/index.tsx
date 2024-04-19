import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {useListController} from "./useListController";
import {CustomFilterSheet} from "@/view/components/CustomFilterSheet";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ListEfficienciesDataGrid} from "../../components/ListEfficienciesDataGrid";

export const List = () => {
  const {efficiencies, handleApplyFilters, isFetchingEfficiencies} =
    useListController();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="LISTAGEM" displayRig>
        <CustomFilterSheet
          isLoading={isFetchingEfficiencies}
          onApplyFilters={handleApplyFilters}
        />
      </Header>

      <div className="w-full h-full lg:mx-5 mt-5 max-w-[1400px] flex justify-center  ">
        {isFetchingEfficiencies && (
          <div className="lg:w-[70vw] lg:h-[70vh] bg-card p-2 rounded-md flex justify-center items-center">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        {!isFetchingEfficiencies && (
          <div className="w-full h-full  p-2 rounded-md flex justify-center items-center lg:w-[70vw] lg:h-[70vh]">
            <Card className="w-full h-full overflow-y-auto">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent className="">
                <ListEfficienciesDataGrid
                  data={efficiencies}
                  isDashboard={false}
                  limitPagination={false}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
