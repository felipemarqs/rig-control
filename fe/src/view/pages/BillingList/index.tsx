import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {Select} from "../../components/Select";
import {Spinner} from "../../components/Spinner";
import {ListEfficienciesDataGrid} from "../../components/ListEfficienciesDataGrid";
import {useBillingListController} from "./useBillingListController";
import {ListBillingDataGrid} from "./components/ListBillingDataGrid";

export const ListBilling = () => {
  const {
    handleApplyFilters,
    handleEndDateChange,
    handleStartDateChange,
    selectedEndDate,
    selectedStartDate,
    isFetchingBillings,
    billings,
  } = useBillingListController();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="LISTAGEM" subtitle="Listagem de faturamento das sondas" />

      <div className="w-full flex justify-end gap-4 px-4">
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
        {isFetchingBillings && (
          <div className="w-[70vw] h-[70vh] bg-primary-500 p-2 rounded-md flex justify-center items-center">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        {!isFetchingBillings && (
          <div className="w-[70vw] h-[70vh] bg-primary-200 p-2 rounded-md flex justify-center items-center">
            <ListBillingDataGrid data={billings} />
          </div>
        )}
      </div>
    </div>
  );
};
