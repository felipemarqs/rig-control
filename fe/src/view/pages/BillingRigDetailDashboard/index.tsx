import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {
  BillingRigDetailDashboardContext,
  BillingRigDetailDashboardProvider,
} from "./BillingRigDetailDashboardContext";
import {Spinner} from "../../components/Spinner";
import {NotFound} from "../../components/NotFound";
import {ListBillingDataGrid} from "./components/ListBillingDataGrid";
import "swiper/css";
import {Select} from "../../components/Select";
import {FilterType} from "../../../app/entities/FilterType";
import {FilterIcon} from "lucide-react";
import {formatCurrency} from "../../../app/utils/formatCurrency";

export const BillingRigDetailDashboard = () => {
  return (
    <BillingRigDetailDashboardProvider>
      <BillingRigDetailDashboardContext.Consumer>
        {({
          isEmpty,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          selectedEndDate,
          handleApplyFilters,
          isFetchingBilling,
          handleChangeRig,
          selectedRig,
          rigs,
          totalAmount,
          selectedFilterType,
          handleToggleFilterType,
          filterOptions,
          selectedPeriod,
          handleChangePeriod,
          months,
          years,
          windowWidth,
          selectedYear,
          handleYearChange,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header
              title="DASHBOARD DE FATURAMENTO"
              subtitle="Página de visualização da previsão do faturamento geral da sonda"
            />
            <div className="w-full flex flex-wrap justify-center items-center lg:justify-end gap-1 lg:px-4">
              <div className="w-[113px] lg:w-[213px]">
                <Select
                  error={""}
                  placeholder="Tipo de Filtro"
                  value={selectedFilterType}
                  onChange={(value) =>
                    handleToggleFilterType(value as FilterType)
                  }
                  options={filterOptions}
                />
              </div>
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
              {selectedFilterType === FilterType.PERIOD && (
                <>
                  <div className="w-[113px] lg:w-[123px]">
                    <Select
                      error={""}
                      placeholder="Período"
                      value={selectedPeriod}
                      onChange={(value) => handleChangePeriod(value)}
                      options={months}
                    />
                  </div>

                  <div className="w-[113px] lg:w-[123px]">
                    <Select
                      error={""}
                      placeholder="Ano"
                      value={selectedYear}
                      onChange={(value) => handleYearChange(value)}
                      options={years}
                    />
                  </div>
                </>
              )}

              {selectedFilterType === FilterType.CUSTOM && (
                <>
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
                </>
              )}

              <div>
                <Button
                  className="h-[32px] lg:h-[52px]"
                  onClick={handleApplyFilters}
                >
                  {windowWidth <= 1024 ? <FilterIcon /> : "Aplicar Filtro"}
                </Button>
              </div>
            </div>

            <div className=" w-full flex justify-center my-6 ">
              {/*    {!isEmpty && ( */}
              <div className="stats  bg-gray-500">
                {!isFetchingBilling && (
                  <>
                    <div className="stat">
                      <div className="stat-figure text-white">
                        {/*  <div
                          className="radial-progress text-primary-500"
                          style={{"--value": 70} as any} // @ts-ignore
                        >
                          {70 || 0}%
                        </div> */}
                      </div>
                      <div className="stat-title  text-primary-500">
                        Fat. Total
                      </div>
                      <div className="stat-value  text-primary-500">
                        {formatCurrency(totalAmount)}
                      </div>
                      <div className="stat-desc  text-primary-500">
                        Total de faturamento no período.
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/*  )} */}
            </div>

            <div className=" mx-auto max-w-[1024px] bg-gray-400  rounded-md lg:min-w-[1300px] lg:p-4">
              {isEmpty && (
                <>
                  {isFetchingBilling && (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingBilling && (
                    <NotFound>
                      <strong>Não</strong> existem dados para a{" "}
                      <strong>sonda</strong> no <strong>período</strong>{" "}
                      selecionado!
                    </NotFound>
                  )}
                </>
              )}

              {!isEmpty && (
                <div className="grid grid-cols-12 auto-rows-[120px] gap-3">
                  <div className="col-span-12  row-span-4 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingBilling && <Spinner />}
                    {!isFetchingBilling && <ListBillingDataGrid />}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </BillingRigDetailDashboardContext.Consumer>
    </BillingRigDetailDashboardProvider>
  );
};
