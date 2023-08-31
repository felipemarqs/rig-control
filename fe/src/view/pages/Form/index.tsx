import {TimePicker} from "antd";
import {Header} from "../../components/Header";
import dayjs from "dayjs";
import React from "react";

import {Button} from "../../components/Button";
import {Select} from "../../components/Select";
import TextArea from "antd/es/input/TextArea";
import {useFormController} from "./useFormController";
import {periodTypes} from "../../../app/utils/periodTypes";
import {getPeriodClassification} from "../../../app/utils/periodClassifications";
import {DatePickerInput} from "../../components/DatePickerInput";
import {cn} from "../../../app/utils/cn";

export const Form = () => {
  const {
    handleStartHourChange,
    handleDeletePeriod,
    handleEndHourChange,
    addPeriod,
    periods,
    handlePeriodType,
    handlePeriodClassification,
    handleFluidRatio,
    handleEquipmentRatio,
    handleDateChange,
    date,
    remainingMinutes,
    isFormValid,
    handleDescription,
  } = useFormController();

  const isPending = remainingMinutes !== 0;

  const format = "HH:mm";
  return (
    <div className="w-full min-w-[1000px]">
      <Header
        title="FORMULÁRIO"
        subtitle="Submissão dos dados de eficiência da sonda."
      />
      <div
        className={cn(
          "fixed top-5 right-5 bg-redAccent-500  text-white p-4 z-50 rounded-lg",
          !isPending && "bg-secondary-500"
        )}
      >
        {isPending && <span> Minutos restantes: {remainingMinutes}</span>}
        {!isPending && <span> Horários Preenchidos!</span>}
      </div>

      <div className="w-full  flex  justify-center ">
        <div className=" max-h-[90vh] overflow-y-scroll w-[70%] min-w-[700px] max-w-[800px]  bg-primary-500 p-4 rounded-xl  ">
          <div className={cn(" flex items-center justify-center gap-2")}>
            <DatePickerInput
              value={date}
              onChange={(value) => handleDateChange(value)}
            />
            {!date && (
              <div
                className={cn(
                  " bg-redAccent-500  text-white p-4 z-50 rounded-lg"
                )}
              >
                <span> Selecione uma data!! </span>
              </div>
            )}
          </div>
          {periods.map(
            ({
              id,
              startHour,
              endHour,
              type,
              classification,
              fluidRatio,
              equipmentRatio,
              description,
            }) => (
              <React.Fragment key={id}>
                <div className="flex justify-center flex-col items-center border py-4 border-white my-4 ">
                  <div className="flex justify-between p-4 h-[75px]  w-[90%]">
                    <div className="w-[33%]">
                      <Select
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

                    <div className="w-[33%]">
                      {type && (
                        <Select
                          onChange={(value) =>
                            handlePeriodClassification(id, value)
                          }
                          placeholder="Classificação"
                          value={classification}
                          options={getPeriodClassification(type)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between p-4 h-[75px] w-[90%] ">
                    <div className="flex justify-between items-center gap-1  ">
                      <span className="text-white text-xs tracking-[-0.5px]">
                        Horário Inicial:
                      </span>
                      <TimePicker
                        className="text-black"
                        style={{
                          color: "black",
                        }}
                        popupStyle={{color: "#1c7b7b"}}
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

                    {}
                    <div className="flex justify-between items-center gap-1  ">
                      <span className="text-white text-xs tracking-[-0.5px]">
                        Horário Final:
                      </span>
                      <TimePicker
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

                  <div className="flex justify-between p-4 h-[75px] w-[90%] ">
                    <div className="flex justify-between items-center w-full gap-1">
                      <span className="text-white text-xs tracking-[-0.5px]">
                        Descrição:
                      </span>
                      <TextArea
                        maxLength={100}
                        style={{height: 50, resize: "vertical", border: "none"}}
                        value={description}
                        onChange={(e) => handleDescription(id, e.target.value)}
                        placeholder="Descrição"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between p-4 h-[75px]  w-[90%]">
                    <div className="w-[33%]">
                      <Select
                        placeholder="Movimentação de Fluido"
                        value={fluidRatio}
                        onChange={(value) => handleFluidRatio(id, value)}
                        options={getPeriodClassification("DTM")}
                      />
                    </div>

                    <div className="w-[33%]">
                      <Select
                        placeholder="Movimentação de Equip."
                        value={equipmentRatio}
                        onChange={(value) => handleEquipmentRatio(id, value)}
                        options={getPeriodClassification("DTM")}
                      />
                    </div>
                  </div>

                  {periods.length > 1 && (
                    <div className="flex justify-end w-[90%] px-4">
                      <Button
                        className="bg-redAccent-500 w-[35%] h-[31px] rounded-lg"
                        onClick={() => handleDeletePeriod(id)}
                      >
                        <span className="text-sm">Remover Periodo</span>
                      </Button>
                    </div>
                  )}
                </div>

                <hr />
              </React.Fragment>
            )
          )}

          <div className="flex justify-end mt-4 ">
            <Button
              className="bg-secondary-500 w-1/3 h-7"
              onClick={() => addPeriod()}
            >
              Adicionar período
            </Button>
          </div>

          <div className="flex justify-center mt-6 ">
            <Button
              disabled={!isFormValid}
              className="bg-secondary-500 w-2/3 "
              onClick={() => console.log(periods)}
            >
              Enviar dados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
