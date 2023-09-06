import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {Select} from "../../components/Select";
import {Spinner} from "../../components/Spinner";
import {ListEfficienciesDataGrid} from "../../components/ListEfficienciesDataGrid";
import {useListController} from "./useListController";

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

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="LISTAGEM" subtitle="Listagem de efficienciências" />

      <div className="w-full flex justify-end gap-4 px-4">
        <div className="w-[123px]">
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
            className="h-[42px]"
            error={""}
            value={new Date(selectedStartDate)}
            onChange={(value) => handleStartDateChange(value)}
          />
        </div>

        <div>
          <DatePickerInput
            placeholder="Data de Fim"
            className="h-[42px]"
            error={""}
            value={new Date(selectedEndDate)}
            onChange={(value) => handleEndDateChange(value)}
          />
        </div>

        <div>
          <Button className="h-[42px]" onClick={handleApplyFilters}>
            Aplicar Filtros
          </Button>
        </div>
      </div>

      <div className="w-full h-full  mx-5 mt-5 max-w-[1400px] flex justify-center  ">
        {isFetchingEfficiencies && (
          <div className="w-[70vw] h-[70vh] bg-primary-500 p-2 rounded-md flex justify-center items-center">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        {!isFetchingEfficiencies && (
          <div className="w-[70vw] h-[70vh] bg-primary-200 p-2 rounded-md flex justify-center items-center">
            <ListEfficienciesDataGrid data={efficiencies} isDashboard={false} />
          </div>
        )}
      </div>
    </div>
  );
};
