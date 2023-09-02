import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";
import { DatePickerInput } from "../../components/DatePickerInput";
import { Header } from "../../components/Header";
import { Select } from "../../components/Select";
import { Spinner } from "../../components/Spinner";
import { DashboardContext, DashboardProvider } from "./DashboardContext";
import { LineChart } from "./components/LineChart";

export const Dashboard = () => {
  const { signout, user } = useAuth();
  console.log({ user });

  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({
          selectedRig,
          handleChangeRig,
          selectedEndDate,
          selectedStartDate,
          handleStartDateChange,
          handleEndDateChange,
          handleApplyFilters,
          isFetchingEfficiencies,
        }) => (
          <div className="w-full h-full">
            <Header title="DASHBOARD" subtitle="Página de início do usuário" />
            <div className="w-full flex justify-end gap-4 px-4">
              <div className="w-[123px]">
                <Select
                  error={""}
                  placeholder="Sonda"
                  value={selectedRig}
                  onChange={(value) => handleChangeRig(value)}
                  options={[
                    {
                      value: "ce5430b3-9e04-422e-bf3b-fc35b82a6111",
                      label: "SPT 116",
                    },
                    {
                      value: "e3de80b0-619c-4743-9a5d-f59daeb59288",
                      label: "SPT 88",
                    },
                  ]}
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
                <div className="stat">
                  <div className="stat-figure text-white">
                    <div
                      className="radial-progress text-primary-500"
                      style={{ "--value": 70 }}
                    >
                      70%
                    </div>
                  </div>
                  <div className="stat-title  text-primary-500">
                    Total Likes
                  </div>
                  <div className="stat-value  text-primary-500">25.6K</div>
                  <div className="stat-desc  text-primary-500">
                    21% more than last month
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-red">
                    <div className="stat-figure text-white">
                      <div
                        className="radial-progress text-redAccent-500"
                        style={{ "--value": 70 }}
                      >
                        70%
                      </div>
                    </div>
                  </div>
                  <div className="stat-title text-redAccent-500">
                    Page Views
                  </div>
                  <div className="stat-value text-redAccent-500">2.6M</div>
                  <div className="stat-desc text-redAccent-500">
                    21% more than last month
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-white">
                    <div className="avatar online">
                      <div className="w-16 rounded-full">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value text-white">86%</div>
                  <div className="stat-title text-white">Tasks done</div>
                  <div className="stat-desc text-white">31 tasks remaining</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-white">
                    <div className="avatar online">
                      <div className="w-16 rounded-full">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value text-white">86%</div>
                  <div className="stat-title text-white">Tasks done</div>
                  <div className="stat-desc text-white">31 tasks remaining</div>
                </div>
              </div>
            </div>

            <div className="h-full w-full min-w-[1050px] mx-auto max-w-[1715px] bg-gray-500 p-4 rounded-md">
              <div className="grid grid-cols-16 auto-rows-[120px] gap-3">
                <div className="col-span-8 row-span-3 flex justify-center bg-gray-200 rounded-lg items-center">
                  {isFetchingEfficiencies && <Spinner />}
                  {!isFetchingEfficiencies && <LineChart />}
                </div>

                <div className="col-span-8 row-span-2 flex justify-center bg-gray-200 rounded-lg items-center">
                  {isFetchingEfficiencies && <Spinner />}
                  {!isFetchingEfficiencies && <LineChart />}
                </div>
              </div>
            </div>
            <button onClick={signout}>Sair</button>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};
