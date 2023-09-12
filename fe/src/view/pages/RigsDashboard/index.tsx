import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {Header} from "../../components/Header";
import {NotFound} from "../../components/NotFound";
import {Spinner} from "../../components/Spinner";
import "swiper/css";
import {
  RigsDashboardContext,
  RigsDashboardProvider,
} from "./RigsDashboardContext";

import {AccountCard} from "./components/AccountCard/AccountCard";
import {Swiper, SwiperSlide} from "swiper/react";
import {AccountsSliderNavigation} from "./components/AccountCard/AccountsSliderNavigation";
import {cn} from "../../../app/utils/cn";

export const RigsDashboard = () => {
  return (
    <RigsDashboardProvider>
      <RigsDashboardContext.Consumer>
        {({
          isEmpty,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          selectedEndDate,
          handleApplyFilters,
          isFetchingBillings,
          totalAmount,
          setSliderState,
          sliderState,
          billings,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header
              title="DASHBOARD DE FATURAMENTO"
              subtitle="Página de visualização da previsão do faturamento geral"
            />
            <div className="w-full flex justify-end gap-4 px-4">
              {/*  <div className="w-[123px]">
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
            </div> */}

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
            <div className=" w-full flex justify-center my-6"></div>

            <div className="min-w-[1050px]  mx-auto max-w-[715px] bg-gray-400 p-4 rounded-md">
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
                      "col-span-12 row-span-3 flex justify-center bg-primary-500 rounded-lg items-center p-4 lg:col-start-2 lg:col-span-10",
                      billings.length <= 1 && "col-span-6"
                    )}
                  >
                    {isFetchingBillings && <Spinner />}
                    {!isFetchingBillings && (
                      <>
                        <Swiper
                          spaceBetween={16}
                          slidesPerView={billings.length <= 1 ? 1 : 2.2}
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
                            <strong className="text-white tracking-[-1px] text-lg">
                              Sondas Cadastradas no sistema:
                            </strong>
                            <AccountsSliderNavigation
                              isBeginning={sliderState.isBeginning}
                              isEnd={sliderState.isEnd}
                            />
                          </div>
                          {billings.map(({total, rigname, rigid}) => (
                            <SwiperSlide key={rigid}>
                              <AccountCard total={total} rigName={rigname} />
                            </SwiperSlide>
                          ))}

                          {/*  <SwiperSlide>
                            <AccountCard total={3000} rigName="SPT 111" />
                          </SwiperSlide>
                            <SwiperSlide>
                            <AccountCard total={3000} rigName="SPT 60" />
                          </SwiperSlide> */}
                        </Swiper>
                      </>
                    )}
                  </div>

                  {/*   <div className="col-start-2 col-span-10  row-span-4 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingBillings && <Spinner />}
                  </div> */}
                </div>
              )}
            </div>
          </div>
        )}
      </RigsDashboardContext.Consumer>
    </RigsDashboardProvider>
  );
};
