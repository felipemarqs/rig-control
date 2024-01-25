import {ChevronUp, FilterIcon, X} from "lucide-react";
import {FilterType} from "../../../app/entities/FilterType";
import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {Select} from "../../components/Select";
import {ReportContext, ReportProvider} from "./components/ReportContext";
import {PeriodType} from "../../../app/entities/PeriodType";
import {Spinner} from "../../components/Spinner";
import {NotFound} from "../../components/NotFound";
import {PeriodsDataGrid} from "./components/PeriodsDataGrid";
import {PeriodClassification} from "../../../app/entities/PeriodClassification";
import {RepairClassification} from "../../../app/entities/RepairClassification";
import {CleanFieldContainer} from "../../components/CleanFieldContainer";

export const Report = () => {
  return (
    <ReportProvider>
      <ReportContext.Consumer>
        {({
          rigs,
          periods,
          selectedYear,
          filterOptions,
          selectedFilterType,
          handleToggleFilterType,
          handleChangePeriod,
          handleYearChange,
          handleApplyFilters,
          handleChangeRig,
          selectedRig,
          selectedPeriod,
          months,
          years,
          handleEndDateChange,
          onPaginationModelChange,
          handleStartDateChange,
          selectedEndDate,
          selectedStartDate,
          windowWidth,
          periodTypeOptions,
          selectedPeriodType,
          periodClassificationOptions,
          isFetchingPeriods,
          totalItems,
          handleRepairClassification,
          handlePeriodClassification,
          handleTogglePeriodType,
          handleClearFilters,
          handleClearSelectedPeriodClassification,
          handleClearSelectedRepairClassification,
          repairClassificationOptions,
          isEmpty,
          filters,
          isFilterContainerVisible,
          toggleFilterContainerVisibility,
          isFiltersValid,
          selectedPeriodClassification,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="RELATÓRIO" subtitle="Relatório por Períodos" />

            <div className="flex justify-center flex-col items-center">
              <div className="p-4 flex justify-between items-center gap-4 w-10/12 text-black border border-gray-500  border-b-0">
                <div className="flex justify-center items-center gap-2">
                  <FilterIcon />
                  Filtros de Pesquisa:{" "}
                </div>
                <button
                  onClick={toggleFilterContainerVisibility}
                  className={`text-white bg-primary-500 w-12 h-12 flex justify-center items-center rounded-full transform transition-transform duration-200 ease-in ${
                    isFilterContainerVisible ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronUp />
                </button>
              </div>
              <div
                className={`w-10/12 flex flex-wrap justify-center flex-col border border-gray-500 p-4 items-center lg:justify-end gap-2 transition-all overflow-hidden ${
                  isFilterContainerVisible
                    ? "max-h-[1000px]"
                    : "max-h-0 p-0 border-0 border-t-2"
                } ease-in-out duration-500`}
              >
                <div
                  className={`${
                    isFilterContainerVisible ? "flex" : "hidden"
                  } flex-col w-full justify-center gap-6 lg:flex-row transition-all ease-in-out duration-500`}
                >
                  <div className="w-full lg:w-[213px]">
                    <Select
                      error={""}
                      placeholder="Tipo do Período"
                      value={selectedPeriodType}
                      onChange={(value) =>
                        handleTogglePeriodType(value as PeriodType)
                      }
                      options={periodTypeOptions}
                    />
                  </div>
                  {periodClassificationOptions && (
                    <div className="w-full lg:w-[300px]">
                      <Select
                        error={""}
                        onChange={(value) =>
                          handlePeriodClassification(
                            value as PeriodClassification
                          )
                        }
                        placeholder="Classificação"
                        value={selectedPeriodClassification}
                        options={periodClassificationOptions}
                      />
                      {selectedPeriodClassification && (
                        <CleanFieldContainer
                          label="Limpar Campo"
                          onClick={handleClearSelectedPeriodClassification}
                        />
                      )}
                    </div>
                  )}

                  {selectedPeriodType === "REPAIR" &&
                    repairClassificationOptions && (
                      <div className="w-full lg:w-[300px]">
                        <Select
                          error={""}
                          onChange={(value) =>
                            handleRepairClassification(
                              value as RepairClassification
                            )
                          }
                          placeholder="Tipo do Reparo"
                          value={filters.repairClassification ?? ""}
                          options={repairClassificationOptions}
                        />
                        {filters.repairClassification && (
                          <CleanFieldContainer
                            label="Limpar Campo"
                            onClick={handleClearSelectedRepairClassification}
                          />
                        )}
                      </div>
                    )}
                </div>

                <div
                  className={`${
                    isFilterContainerVisible ? "flex" : "hidden"
                  } flex-col w-full justify-center gap-6 lg:flex-row transition-all ease-in-out duration-500`}
                >
                  <div className="w-full lg:w-[250px]">
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
                  <div className="w-full lg:w-[123px]">
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
                      <div className="w-full lg:w-[123px]">
                        <Select
                          error={""}
                          placeholder="Período"
                          value={selectedPeriod}
                          onChange={(value) => handleChangePeriod(value)}
                          options={months}
                        />
                      </div>

                      <div className="w-full lg:w-[123px]">
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
                </div>

                <div
                  className={`${
                    isFilterContainerVisible ? "flex" : "hidden"
                  } w-full justify-end gap-6 mt-4`}
                >
                  <Button
                    variant="ghost"
                    className="h-[32px]"
                    onClick={handleClearFilters}
                  >
                    {windowWidth <= 1024 ? <X /> : "Limpar Campos"}
                  </Button>
                  <Button
                    disabled={!isFiltersValid}
                    className="h-[32px]"
                    onClick={handleApplyFilters}
                  >
                    {windowWidth <= 1024 ? <FilterIcon /> : "Aplicar Filtro"}
                  </Button>
                </div>
              </div>
            </div>

            {isEmpty && (
              <>
                {isFetchingPeriods && (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner />
                  </div>
                )}

                {!isFetchingPeriods && (
                  <NotFound>
                    <strong>Não</strong> existem dados para a{" "}
                    <strong>sonda</strong> no <strong>período</strong>{" "}
                    selecionado!
                  </NotFound>
                )}
              </>
            )}

            {!isEmpty && (
              <div className="w-full  flex justify-center items-center">
                <div className="w-full p-4 m-4   rounded-md">
                  <PeriodsDataGrid
                    isLoading={isFetchingPeriods}
                    periods={periods}
                    totalItems={totalItems}
                    filters={filters}
                    onPaginationModelChange={onPaginationModelChange}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </ReportContext.Consumer>
    </ReportProvider>
  );
};
