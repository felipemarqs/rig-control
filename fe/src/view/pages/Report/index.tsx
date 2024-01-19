import {FilterIcon} from "lucide-react";
import {FilterType} from "../../../app/entities/FilterType";
import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {Select} from "../../components/Select";
import {ReportContext, ReportProvider} from "./components/ReportContext";
import {PeriodType} from "../../../app/entities/PeriodType";
import {Spinner} from "../../components/Spinner";
import {NotFound} from "../../components/NotFound";

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
          handleStartDateChange,
          selectedEndDate,
          selectedStartDate,
          windowWidth,
          periodTypeOptions,
          selectedPeriodType,
          isFetchingPeriods,
          handleTogglePeriodType,
          isEmpty,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="RELATÓRIO" subtitle="Relatório por Períodos" />

            <div className="w-full flex flex-wrap justify-center items-center lg:justify-end gap-1 lg:px-4">
              <div className="w-[113px] lg:w-[213px]">
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
              <>
                {periods.map(({startHour, endHour, type}) => (
                  <>
                    <p>{startHour}</p>
                    <p>{endHour}</p>
                    <p>{type}</p>
                  </>
                ))}
              </>
            )}
          </div>
        )}
      </ReportContext.Consumer>
    </ReportProvider>
  );
};
