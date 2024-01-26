import React from "react";
import {cn} from "../../../../app/utils/cn";
import {TimePicker} from "antd";
import dayjs from "dayjs";
import {Select} from "../../../components/Select";
import {periodTypes} from "../../../../app/utils/periodTypes";
import {
  getPeriodClassification,
  getRepairClassification,
} from "../../../../app/utils/periodClassifications";
import {Button} from "../../../components/Button";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "./FormContext/useForm";
import {Input} from "../../../components/Input";
import {ChevronUp, TrashIcon} from "lucide-react";
import {translateType} from "../../../../app/utils/translateType";
import {PeriodType} from "../../../../app/entities/PeriodType";
/* import {NewBraskemFormContainer} from "./NewBraskemForm";
import {TresRFormContainer} from "./TresRForm";
import {OrigemContainer} from "./OrigemForm";
import {CarmoEnergyContainer} from "./CarmoEnergyForm"; */

export const PeriodsFormContainer = () => {
  const {
    handleStartHourChange,
    handleDeletePeriod,
    handleEndHourChange,
    addPeriod,
    periods,
    handlePeriodType,
    handlePeriodClassification,
    handleRepairClassification,
    handleFluidRatio,
    handleEquipmentRatio,
    isFormValid,
    handleDescription,
    handleSubmit,
    cleanFields,
    isLoading,
    updatePeriodState,
    getErrorMessageByFildName,
    handlePeriodWell,
    getPeriodState,
  } = useForm();

  const format = "HH:mm";
  return (
    <div className=" max-h-[90vh]  flex-1  ">
      <header className="mt-10">
        <h2 className="text-primary-500 font-bold">Períodos:</h2>
      </header>
      {periods.map(
        (
          {
            id,
            startHour,
            endHour,
            type,
            classification,
            fluidRatio,
            equipmentRatio,
            description,
            repairClassification,
            well,
          },
          index
        ) => (
          <React.Fragment key={id}>
            <div
              className={`flex justify-center flex-col items-center  transition-all  ease-in-out duration-500  bg-gray-400 ${
                getPeriodState(id) ? "my-1" : "py-4 my-4"
              }`}
            >
              <header
                className={`  w-full p-4 flex justify-between items-center  ${
                  getPeriodState(id) ? "" : "border-b border-primary-500"
                }`}
              >
                <div>
                  <h2 className="text-primary-500 font-bold">
                    Período {index + 1}
                  </h2>
                  <div
                    className={cn(
                      `flex flex-col transition-all duration-500 ${
                        getPeriodState(id) ? "" : "hidden"
                      }`
                    )}
                  >
                    <div>
                      <span className="text-sm">Hora Inicial:</span>{" "}
                      <span className="text-sm">{startHour}</span>
                    </div>
                    <div>
                      <span className="text-sm">Hora Final:</span>{" "}
                      <span className="text-sm">{endHour}</span>
                    </div>
                    <div>
                      <span className="text-sm">Poço:</span>{" "}
                      <span className="text-sm">{well}</span>
                    </div>
                    <div>
                      <span className="text-sm">Tipo:</span>{" "}
                      <span className="text-sm">
                        {translateType(type as PeriodType)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                  {getPeriodState(id) && (
                    <button
                      className="text-white bg-redAccent-500 w-12 h-12 flex justify-center items-center rounded-full hover:bg-redAccent-400 duration-250 active:bg-redAccent-700 transition-all "
                      onClick={() => handleDeletePeriod(id)}
                    >
                      <TrashIcon className="text-white" />
                    </button>
                  )}
                  {!getPeriodState(id) && (
                    <Button
                      variant="ghost"
                      //className="bg-transparent border border-primary-500 text-primary-500 rounded-md hover:bg-primary-500 hover:text-white"
                      onClick={() => cleanFields(id)}
                    >
                      Limpar campos
                    </Button>
                  )}
                  <button
                    onClick={() => updatePeriodState(id, !getPeriodState(id))}
                    className={`text-white bg-primary-500 w-12 h-12 flex justify-center items-center rounded-full transform transition-transform duration-200 ease-in ${
                      getPeriodState(id) ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ChevronUp />
                  </button>
                </div>
              </header>
              <div
                className={`grid grid-cols-12 gap-3 w-full transition-all overflow-hidden ${
                  getPeriodState(id) ? "max-h-0" : "max-h-[1000px]"
                } ease-in-out duration-500`}
              >
                <div className="flex justify-between col-span-12  lg:col-span-6 items-end p-4 ">
                  <div className="flex justify-between gap-4  w-full">
                    <div className="flex justify-between flex-col items-center  flex-1 gap-1">
                      <span className="text-black text-xs  font-semibold tracking-[-0.5px] ">
                        Horário Inicial:
                      </span>
                      <TimePicker
                        className="bg-gray-200 border rounded-md px-2 py-1 text-gray-800 w-full h-[52px]"
                        style={{
                          color: "black",
                        }}
                        popupClassName="custom-timepicker-popup"
                        defaultValue={dayjs(startHour, format)}
                        onChange={(time, timeString) =>
                          handleStartHourChange(time, timeString, id)
                        }
                        format={format}
                        disabledTime={() => {
                          let minHour = 0;
                          let minMinute = 0;
                          if (periods.length > 1) {
                            const [hourString, minString] =
                              periods[periods.length - 2].endHour.split(":");

                            minHour = Number(hourString); // Defina o valor mínimo da hora aqui
                            minMinute = Number(minString);
                          }
                          // Defina o valor mínimo dos minutos aqui

                          return {
                            disabledHours: () => {
                              const disabledHours = Array.from(
                                {length: 24},
                                (_, hour) => (hour < minHour ? hour : -1)
                              );
                              return disabledHours;
                            },
                            disabledMinutes: (selectedHour) => {
                              if (selectedHour === minHour) {
                                // Desativar minutos antes do horário mínimo
                                return Array.from({length: 60}, (_, minute) =>
                                  minute < minMinute ? minute : -1
                                );
                              }
                              return [];
                            },
                          };
                        }}
                      />
                    </div>

                    <div className="flex justify-between flex-col  items-center gap-1  flex-1 ">
                      <span className="text-black font-semibold text-xs tracking-[-0.5px]">
                        Horário Final:
                      </span>
                      <TimePicker
                        className="bg-gray-200 border rounded-md px-2 py-1 text-gray-800 w-full h-[52px]"
                        defaultValue={dayjs(endHour, format)}
                        onChange={(time, timeString) =>
                          handleEndHourChange(time, timeString, id)
                        }
                        format={format}
                        disabledTime={() => {
                          const [hourString, minuteString] =
                            startHour.split(":");

                          const minHour = Number(hourString); // Defina o valor mínimo da hora aqui
                          const minMinute = Number(minuteString); // Defina o valor mínimo dos minutos aqui
                          return {
                            disabledHours: () => {
                              const disabledHours = Array.from(
                                {length: 24},
                                (_, hour) => (hour < minHour ? hour : -1)
                              );
                              return disabledHours;
                            },
                            disabledMinutes: (selectedHour) => {
                              if (selectedHour === minHour) {
                                // Desativar minutos antes do horário mínimo
                                return Array.from({length: 60}, (_, minute) =>
                                  minute < minMinute ? minute : -1
                                );
                              }
                              return [];
                            },
                          };
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between col-span-12  lg:col-span-6  items-end p-4 ">
                  <div className="w-full">
                    <Input
                      onChange={(value) =>
                        handlePeriodWell(id, value.target.value)
                      }
                      value={well}
                      name="well"
                      error={getErrorMessageByFildName("well")}
                      placeholder={type === "DTM" ? "Poço de Destino" : "Poço"}
                      labelStyles="text-black"
                      className="w-full border-1 text-black border-black bg-white hover:bg-white "
                    />
                  </div>
                </div>

                <div className="flex justify-between p-4 col-span-12  lg:col-span-6  ">
                  <div className="w-full">
                    <Select
                      error={!type ? "Obrigatório" : ""}
                      placeholder="Tipo"
                      value={type}
                      onChange={(value) => handlePeriodType(id, value)}
                      options={periodTypes.map(({id, type}) => {
                        return {
                          value: id,
                          label: type,
                        };
                      })}
                    />
                  </div>
                </div>

                <div className="flex justify-between p-4 col-span-12  lg:col-span-6  ">
                  {type && (
                    <div className="w-full">
                      <Select
                        error={!classification ? "Obrigatório" : ""}
                        onChange={(value) =>
                          handlePeriodClassification(id, value)
                        }
                        placeholder="Classificação"
                        value={classification}
                        options={getPeriodClassification(type)}
                      />
                    </div>
                  )}
                </div>

                {type === "REPAIR" && (
                  <div className="flex justify-between p-4 col-span-12  ">
                    <div className="w-full">
                      <Select
                        error={!repairClassification ? "Obrigatório" : ""}
                        onChange={(value) =>
                          handleRepairClassification(id, value)
                        }
                        placeholder="Tipo do Reparo"
                        value={repairClassification ?? ""}
                        options={getRepairClassification(classification)}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between col-span-12  p-4 lg:col-span-6 ">
                  <div className="w-full">
                    <Select
                      placeholder="Movimentação de Fluido"
                      value={fluidRatio}
                      onChange={(value) => handleFluidRatio(id, value)}
                      options={getPeriodClassification("DTM")}
                    />
                  </div>
                </div>

                <div className="flex justify-between col-span-12  p-4  lg:col-span-6 ">
                  <div className="w-full">
                    <Select
                      placeholder="Movimentação de Equipamento"
                      value={equipmentRatio}
                      onChange={(value) => handleEquipmentRatio(id, value)}
                      options={getPeriodClassification("DTM")}
                    />
                  </div>
                </div>
                <div className="flex justify-between p-4 col-span-12">
                  <div className="flex justify-between items-center w-full gap-1">
                    <TextArea
                      maxLength={5000}
                      style={{
                        height: 100,
                        resize: "vertical",
                        border: "none",
                      }}
                      value={description}
                      onChange={(e) => handleDescription(id, e.target.value)}
                      placeholder="Descrição"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 col-span-12 px-4">
                  {index > 0 && (
                    <Button
                      className="bg-redAccent-500 w-1/3 lg:w-1/4 text-sm"
                      onClick={() => handleDeletePeriod(id)}
                    >
                      <span className="text-sm">Remover Periodo</span>
                    </Button>
                  )}

                  <Button
                    className="bg-secondary-500 w-1/3 lg:w-1/4 text-sm"
                    onClick={() => addPeriod()}
                  >
                    Adicionar período
                  </Button>
                </div>
              </div>
            </div>

            <hr />
          </React.Fragment>
        )
      )}

      <div className="lg:flex lg:justify-center pb-6 lg:my-6 ">
        <Button
          disabled={!isFormValid || isLoading}
          className="bg-secondary-500 w-2/3 "
          onClick={() => handleSubmit(periods)}
        >
          Enviar dados
        </Button>
      </div>
    </div>
  );
};
