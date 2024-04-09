import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {
  BillingDashboardContext,
  BillingDashboardProvider,
} from "./BillingDashboardContext";
import {Spinner} from "../../components/Spinner";
import {NotFound} from "../../components/NotFound";
import {BarChart} from "./components/BarChart";
import {Swiper, SwiperSlide} from "swiper/react";
import {RigCard} from "./components/RigCard/RigCard";
import {RigsSliderNavigation} from "./components/RigCard/RigsSliderNavigation";
import {cn} from "../../../app/utils/cn";
import {EditRigModal} from "./modals/EditRigModal";
import {RigBillingConfigCard} from "./components/RigBillingConfigCard/RigBillingConfigCard";
import {EditConfigModal} from "./modals/EditConfigModal";
import "swiper/css";
import {Select} from "../../components/Select";
import {FilterType} from "../../../app/entities/FilterType";
import {FilterIcon} from "lucide-react";

export const BillingDashboard = () => {
  return (
    <BillingDashboardProvider>
      <BillingDashboardContext.Consumer>
        {({
          isEmpty,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          selectedEndDate,
          handleApplyFilters,
          isFetchingBillings,
          totalAmount,
          billings,
          setSliderState,
          sliderState,
          setConfigSliderState,
          configSliderState,
          rigBeingEdited,
          configs,
          configBeingEdited,
          selectedFilterType,
          selectedPeriod,
          handleChangePeriod,
          months,
          selectedYear,
          handleYearChange,
          windowWidth,
          totalGlossAmount,
          totalRepairAmount,
          years,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header
              title="DASHBOARD DE FATURAMENTO"
              subtitle="Página de visualização da previsão do faturamento geral"
            />
            <div className="w-full flex flex-wrap justify-center items-center lg:justify-end gap-1 lg:px-4">
              {/*   <div className="w-[113px] lg:w-[213px]">
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
              */}
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
            <div className=" w-full flex justify-center my-6">
              <div className="stats  bg-gray-500">
                {!isFetchingBillings && (
                  <>
                    <div className="stat">
                      <div className="stat-figure text-white">
                        {/*  <div
                          className="radial-progress text-primary"
                          style={{"--value": 70} as any} // @ts-ignore
                        >
                          {70 || 0}%
                        </div> */}
                      </div>
                      <div className="stat-title  text-primary">Fat. Total</div>
                      <div className="stat-value  text-primary">
                        {totalAmount}
                      </div>
                      <div className="stat-desc  text-primary">
                        Total de faturamento no período.
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-white">
                        {/*  <div
                          className="radial-progress text-primary"
                          style={{"--value": 70} as any} // @ts-ignore
                        >
                          {70 || 0}%
                        </div> */}
                      </div>
                      <div className="stat-title  text-redAccent-500">
                        Fat. Perdido por Glosa
                      </div>
                      <div className="stat-value  text-redAccent-500">
                        {totalGlossAmount}
                      </div>
                      <div className="stat-desc  text-redAccent-500">
                        Total de faturamento perdido por glosa no periodo.
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-white">
                        {/*  <div
                          className="radial-progress text-redAccent-500"
                          style={{"--value": 70} as any} // @ts-ignore
                        >
                          {70 || 0}%
                        </div> */}
                      </div>
                      <div className="stat-title  text-redAccent-500">
                        Fat. Perdido por Reparo
                      </div>
                      <div className="stat-value  text-redAccent-500">
                        {totalRepairAmount}
                      </div>
                      <div className="stat-desc  text-redAccent-500">
                        Total de faturamento perdido por reparo no periodo.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className=" mx-auto max-w-[1024px] bg-gray-400  rounded-md lg:min-w-[1300px] lg:p-4">
              {isEmpty && (
                <>
                  {isFetchingBillings && (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingBillings && (
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
                  <div className="col-span-12 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center lg:col-span-12">
                    {isFetchingBillings && <Spinner />}
                    {!isFetchingBillings && <BarChart />}
                  </div>

                  <div
                    className={cn(
                      "hidden col-span-12 row-span-3  justify-center bg-primary rounded-lg items-center lg:p-4 lg:col-span-4"
                    )}
                  >
                    {isFetchingBillings && <Spinner />}
                    {!isFetchingBillings && (
                      <>
                        <Swiper
                          spaceBetween={16}
                          slidesPerView={billings.length === 1 ? 1 : 1.2}
                          onSlideChange={(swiper) => {
                            setSliderState({
                              isBeginning: swiper.isBeginning,
                              isEnd: swiper.isEnd,
                            });
                          }}
                        >
                          <div
                            className="flex items-center justify-between mb-2"
                            slot="container-start"
                          >
                            <strong className="text-white tracking-[-1px] text-sm">
                              Sondas Cadastradas no sistema:
                            </strong>
                            <RigsSliderNavigation
                              isBeginning={sliderState.isBeginning}
                              isEnd={sliderState.isEnd}
                            />
                          </div>
                          {billings.map((billing) => (
                            <SwiperSlide key={billing.rigid}>
                              <RigCard data={billing} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </>
                    )}
                  </div>

                  <div
                    className={cn(
                      " col-span-12 row-span-5 flex justify-center bg-primary rounded-lg items-center p-4",
                      configs.length <= 3 && "lg:p-[12rem]"
                    )}
                  >
                    {isFetchingBillings && <Spinner />}
                    {!isFetchingBillings && (
                      <>
                        <Swiper
                          spaceBetween={16}
                          slidesPerView={configs.length <= 2 ? 1 : 2}
                          onSlideChange={(swiper) => {
                            setConfigSliderState({
                              isBeginning: swiper.isBeginning,
                              isEnd: swiper.isEnd,
                            });
                          }}
                        >
                          <div
                            className="flex items-center justify-between mb-2"
                            slot="container-start"
                          >
                            <strong className="text-white tracking-[-1px] text-sm">
                              Valores para cálculo de previsão:
                            </strong>
                            <RigsSliderNavigation
                              isBeginning={configSliderState.isBeginning}
                              isEnd={configSliderState.isEnd}
                            />
                          </div>
                          {configs.map((config) => (
                            <SwiperSlide key={config.id}>
                              <RigBillingConfigCard data={config} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            {rigBeingEdited && <EditRigModal />}
            {configBeingEdited && <EditConfigModal />}
          </div>
        )}
      </BillingDashboardContext.Consumer>
    </BillingDashboardProvider>
  );
};
