import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {Select} from "../../components/Select";
import {Spinner} from "../../components/Spinner";
import {ListEfficienciesDataGrid} from "../../components/ListEfficienciesDataGrid";
import {useListController} from "./useListController";
import {FilterIcon} from "lucide-react";
import {useSidebarContext} from "../../../app/contexts/SidebarContext";

export const List = () => {
  const {
    efficiencies,
    selectedRig,
    rigs,
    handleChangeRig,
    handleApplyFilters,
    handleEndDateChange,
    handleStartDateChange,
    selectedEndDate,
    selectedStartDate,
    isFetchingEfficiencies,
  } = useListController();

  const {windowWidth} = useSidebarContext();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="LISTAGEM" subtitle="Listagem de efficienciências" />

      <div className="w-full flex flex-wrap justify-center items-center lg:justify-end gap-1 lg:px-4">
        <div className="w-[113px] lg:w-[123px]">
          <Select
            error={""}
            placeholder="Sonda"
            value={selectedRig}
            onChange={(value) => handleChangeRig(value)}
            options={rigs.map(({id, name}) => ({
              value: id ?? "",
              label: name ?? "",
            }))}
          />
        </div>

        <div>
          <DatePickerInput
            placeholder="Data de Início"
            error={""}
            value={new Date(selectedStartDate)}
            onChange={(value) => handleStartDateChange(value)}
          />
        </div>

        <div>
          <DatePickerInput
            placeholder="Data de Fim"
            error={""}
            value={new Date(selectedEndDate)}
            onChange={(value) => handleEndDateChange(value)}
          />
        </div>

        <div>
          <Button className="h-[32px] lg:h-[52px]" onClick={handleApplyFilters}>
            {windowWidth <= 1024 ? <FilterIcon /> : "Aplicar Filtro"}
          </Button>
        </div>
      </div>

      <div className="w-full h-full  lg:mx-5 mt-5 max-w-[1400px] flex justify-center  ">
        {isFetchingEfficiencies && (
          <div className="lg:w-[70vw] lg:h-[70vh] bg-primary-500 p-2 rounded-md flex justify-center items-center">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        {!isFetchingEfficiencies && (
          <div className="w-full h-full bg-primary-200 p-2 rounded-md flex justify-center items-center lg:w-[70vw] lg:h-[70vh]">
            <ListEfficienciesDataGrid data={efficiencies} isDashboard={false} />
          </div>
        )}
      </div>
    </div>
  );
};
