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
import {Swiper, SwiperSlide} from "swiper/react";
import {RigsSliderNavigation} from "./components/RigCard/RigsSliderNavigation";
import {cn} from "../../../app/utils/cn";
import {EditRigModal} from "./modals/EditRigModal";
import {RigBillingConfigCard} from "./components/RigBillingConfigCard/RigBillingConfigCard";
import {EditConfigModal} from "./modals/EditConfigModal";
import "swiper/css";
import {Select} from "../../components/Select";

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
          isFetchingBillings,
          totalAmount,
          setConfigSliderState,
          configSliderState,
          rigBeingEdited,
          configs,
          configBeingEdited,
          handleChangeRig,
          selectedRig,
          rigs,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header
              title="DASHBOARD DE FATURAMENTO2"
              subtitle="Página de visualização da previsão do faturamento geral"
            />
            <div className="w-full flex justify-end gap-4 px-4">
              <div className="w-[123px]">
                <Select
                  error={""}
                  placeholder="Sonda"
                  value={selectedRig}
                  onChange={(value) => handleChangeRig(value)}
                  options={rigs.map(({id, name}) => ({
                    value: id,
                    label: name,
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
            <div className=" w-full flex justify-center my-6">
              <div className="stats  bg-gray-500">
                {!isFetchingBillings && (
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
                        {totalAmount}
                      </div>
                      <div className="stat-desc  text-primary-500">
                        Total de faturamento no período.
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
                  <div
                    className={cn(
                      " col-span-12 row-span-5 flex justify-center bg-primary-500 rounded-lg items-center p-4",
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

                  <div className="col-span-12  row-span-4 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingBillings && <Spinner />}
                    {!isFetchingBillings && <ListBillingDataGrid />}
                  </div>
                </div>
              )}
            </div>
            {rigBeingEdited && <EditRigModal />}
            {configBeingEdited && <EditConfigModal />}
          </div>
        )}
      </BillingRigDetailDashboardContext.Consumer>
    </BillingRigDetailDashboardProvider>
  );
};