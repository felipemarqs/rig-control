// Importações de componentes e contextos necessários
import {BaggageClaim, FilterIcon, Truck} from "lucide-react";
import {Button} from "../../components/Button";
import {DatePickerInput} from "../../components/DatePickerInput";
import {NotFound} from "../../components/NotFound";
import {Spinner} from "../../components/Spinner";
import {Modal} from "../../components/Modal";
import {AddFiles} from "../../components/AddFiles";
import {AverageBarChart} from "./components/AverageBarChart";
import {
  GlobalDashboardContext,
  GlobalDashboardProvider,
} from "./GlobalDashboardContext";
import {MyResponsivePie} from "./components/PieChart";
import {DaysNotRegistered} from "./components/DaysNotRegistered";

export const GlobalDashboard = () => {
  return (
    <GlobalDashboardProvider>
      <GlobalDashboardContext.Consumer>
        {({
          selectedEndDate,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          handleApplyFilters,
          isFetchingRigsAverage,
          rigsAverage,
          rigs,
          isEmpty,
          windowWidth,
          user,
          months,
          filterOptions,
          selectedPeriod,
          handleIsAlertSeen,
          selectedYear,
          isAlertSeen,
          handleYearChange,
          years,
        }) => (
          <div className="w-full  pt-10 overflow-y-scroll">
            <div className="w-full flex flex-wrap justify-center items-center mb-10 lg:justify-end gap-1 lg:px-4">
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
                {!isFetchingRigsAverage && (
                  <>
                    <div className="stat  border-r border-primary-500">
                      <div className="stat-title  text-primary-500">
                        Sondas Cadastradas
                      </div>
                      <div className="stat-value  text-primary-500">9</div>
                      <div className="stat-desc  text-primary-500">
                        Lorem ipsum dolor, adipisicing elit.
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-red"></div>
                      <div className="stat-title text-redAccent-500">
                        Horas Indisp.
                      </div>
                      <div className="stat-value text-redAccent-500">
                        {81}Hrs
                      </div>
                      <div className="stat-desc text-redAccent-500">
                        Total de não horas faturadas pela sonda
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-primary-500">
                        <div className="w-16 rounded-full">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                            <Truck size={50} />
                          </div>
                        </div>
                      </div>
                      <div className="stat-value text-primary-500">{81}</div>
                      <div className="stat-title text-primary-500">DTMs</div>
                      <div className="stat-desc text-primary-500">
                        No período selecionado
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-primary-500">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                          <BaggageClaim size={50} />
                        </div>
                      </div>
                      <div className="stat-value text-primary-500">{81}</div>
                      <div className="stat-title text-primary-500">
                        Movimentações
                      </div>
                      <div className="stat-desc text-primary-500">
                        No período selecionado
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className=" mx-auto max-w-[1300px] bg-gray-400 min-h-[450px] rounded-md  lg:p-4 flex justify-center items-center">
              {isEmpty && (
                <>
                  {isFetchingRigsAverage && (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  )}

                  {!isFetchingRigsAverage && (
                    <div className="w-full h-full flex justify-center items-center">
                      <NotFound>
                        <strong>Não</strong> existem dados para a{" "}
                        <strong>sonda</strong> no <strong>período</strong>{" "}
                        selecionado!
                      </NotFound>
                    </div>
                  )}
                </>
              )}

              {!isEmpty && (
                <div className=" flex-1 grid grid-cols-12 auto-rows-[120px] gap-3">
                  <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-8 lg:row-span-3">
                    {isFetchingRigsAverage && <Spinner />}
                    {rigsAverage.length === 0 && !isFetchingRigsAverage && (
                      <div className="flex justify-center items-center">
                        <NotFound>
                          <strong>Não</strong> existem dados para a{" "}
                          <strong>sonda</strong> no <strong>período</strong>{" "}
                          selecionado!
                        </NotFound>
                      </div>
                    )}
                    {!isFetchingRigsAverage && rigsAverage.length > 0 && (
                      <div className="w-full h-full">
                        <AverageBarChart />
                      </div>
                    )}
                  </div>

                  <div
                    className={`col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-4  `}
                  >
                    {isFetchingRigsAverage && <Spinner />}
                    {isEmpty && !isFetchingRigsAverage && (
                      <div className="flex justify-center  items-center">
                        <NotFound>
                          <strong>Não</strong> existem dados de{" "}
                          <strong>reparos</strong> para a <strong>sonda</strong>{" "}
                          no <strong>período</strong> selecionado!
                        </NotFound>
                      </div>
                    )}
                    {!isFetchingRigsAverage && !isEmpty && (
                      <div className="w-full h-full">
                        <DaysNotRegistered />
                      </div>
                    )}
                  </div>

                  <div className="col-span-12 row-span-3  flex justify-center bg-gray-200 rounded-lg items-center  lg:col-span-8 lg:row-span-3">
                    {isFetchingRigsAverage && <Spinner />}
                    {rigsAverage.length === 0 && !isFetchingRigsAverage && (
                      <div className="flex justify-center items-center">
                        <NotFound>
                          <strong>Não</strong> existem dados para a{" "}
                          <strong>sonda</strong> no <strong>período</strong>{" "}
                          selecionado!
                        </NotFound>
                      </div>
                    )}
                    {!isFetchingRigsAverage && rigsAverage.length > 0 && (
                      <div className="w-full h-full">
                        <MyResponsivePie />
                      </div>
                    )}
                  </div>

                  {/*    <div className="col-span-6 row-span-2 flex justify-center bg-gray-200 rounded-lg items-center">
                    {isFetchingEfficiencies && <Spinner />}
                    {!isFetchingEfficiencies && <LineChart />}
                  </div>*/}
                </div>
              )}
            </div>
            <Modal
              title="Novidades e Melhorias Recentes!!"
              maxWidth="1000px"
              open={!isAlertSeen}
              onClose={handleIsAlertSeen}
            >
              <div className="text-gray-600 flex items-center">
                <div className=" flex-1 flex items-center justify-center">
                  <AddFiles className="h-60 w-60" />
                </div>
                <div className=" flex-1">
                  <span className="block text-gray-800 font-semibold">
                    Olá {user?.name},
                  </span>

                  <span className="text-gray-800 font-semibold">
                    Confira as últimas{" "}
                    <span className="text-primary-500">atualizações</span> e
                    melhorias que fizemos no sistema para aprimorar ainda mais
                    sua <span className="text-primary-500">experiência</span>.
                    Confira as novidades:
                  </span>
                  <ul className="list-disc list-inside">
                    <li className="my-4">Novidades no Dashboard!</li>
                    <span>
                      Adicionado novo um gráfico ao Dashboard 📊, exibindo a
                      quantidade de reparos realizados em equipamentos durante o
                      período selecionado!
                    </span>
                    <li className="my-4">Nova Página de Relatórios!</li>
                    <span>
                      Apresentamos uma nova página de relatórios que facilitará
                      sua análise de dados. Agora, é possível organizar períodos
                      com base em tipo e classificação, proporcionando uma
                      visualização mais detalhada e personalizada das
                      informações.
                    </span>
                  </ul>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </GlobalDashboardContext.Consumer>
    </GlobalDashboardProvider>
  );
};
