import React from "react";
import {cn} from "../../../../app/utils/cn";
import {DatePickerInput} from "../../../components/DatePickerInput";

import {TimePicker} from "antd";
import dayjs from "dayjs";
import {Select} from "../../../components/Select";
import {periodTypes} from "../../../../app/utils/periodTypes";
import {getPeriodClassification} from "../../../../app/utils/periodClassifications";
import {Button} from "../../../components/Button";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "./FormContext/useForm";
import {Input} from "../../../components/Input";

export const PeriodsFormContainer = () => {
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
    isFormValid,
    handleDescription,
    handleSubmit,
    cleanFields,
    isLoading,
    handleWellChange,
    selectedRig,
    handleChangeRig,
    usersRigs,
    getErrorMessageByFildName,
  } = useForm();

  const format = "HH:mm";
  return (
    <div className=" max-h-[90vh] overflow-y-scroll flex-1 max-w-[800px]  bg-primary-500 lg:p-4 rounded-xl">
      <div className={cn(" flex items-center justify-center gap-2")}>
        <DatePickerInput
          error={getErrorMessageByFildName("date")}
          value={date}
          onChange={(value) => handleDateChange(value)}
        />

        <Input
          onChange={(value) => handleWellChange(value.target.value)}
          name="well"
          error={getErrorMessageByFildName("well")}
          placeholder="Poço"
          labelStyles="text-black"
          className="border-1 text-black border-black bg-white hover:bg-white"
        />

        <div className="w-[123px]">
          <Select
            error={""}
            placeholder="Sonda"
            value={selectedRig}
            onChange={(value) => handleChangeRig(value)}
            options={usersRigs.map(({id, name}) => ({
              value: id,
              label: name,
            }))}
          />
        </div>
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
            <div className="flex justify-center flex-col items-center  py-4  my-4 rounded-xl bg-gray-400 ">
              <div className="flex justify-between p-4  w-[90%] ">
                <div className="flex justify-between flex-col items-center gap-1">
                  <span className="text-black text-xs  font-semibold tracking-[-0.5px]">
                    Horário Inicial:
                  </span>
                  <TimePicker
                    className="bg-gray-200 border rounded-md px-2 py-1 text-gray-800"
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

                {}
                <div className="flex justify-between flex-col  items-center gap-1  ">
                  <span className="text-black font-semibold text-xs tracking-[-0.5px]">
                    Horário Final:
                  </span>
                  <TimePicker
                    defaultValue={dayjs(endHour, format)}
                    onChange={(time, timeString) =>
                      handleEndHourChange(time, timeString, id)
                    }
                    format={format}
                    disabledTime={() => {
                      const [hourString, minuteString] = startHour.split(":");

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

              <div className="flex justify-between p-4   w-[90%]">
                <div className="w-[33%]">
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

                <div className="w-1/2 lg:w-[33%]">
                  {type && (
                    <Select
                      error={!classification ? "Obrigatório" : ""}
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

              <div className="flex justify-between p-4  w-[90%]">
                <div className="w-full   lg:w-[33%]">
                  <Select
                    placeholder="Movimentação de Fluido"
                    value={fluidRatio}
                    onChange={(value) => handleFluidRatio(id, value)}
                    options={getPeriodClassification("DTM")}
                  />
                </div>

                <div className="w-full   lg:w-[33%]">
                  <Select
                    placeholder="Movimentação de Equip."
                    value={equipmentRatio}
                    onChange={(value) => handleEquipmentRatio(id, value)}
                    options={getPeriodClassification("DTM")}
                  />
                </div>
              </div>
              <div className="flex justify-between p-4  w-[90%] ">
                <div className="flex justify-between items-center w-full gap-1">
                  <TextArea
                    maxLength={1000}
                    style={{
                      height: 50,
                      resize: "vertical",
                      border: "none",
                    }}
                    value={description}
                    onChange={(e) => handleDescription(id, e.target.value)}
                    placeholder="Descrição"
                  />
                </div>
              </div>

              <div className="flex justify-between w-[90%] px-4">
                <Button
                  className="bg-redAccent-500 w-[35%] h-[31px] rounded-lg"
                  onClick={() => cleanFields(id)}
                >
                  <span className="text-sm">Limpar Campos</span>
                </Button>

                {periods.length > 1 && (
                  <Button
                    className="bg-redAccent-500 w-[35%] h-[31px] rounded-lg"
                    onClick={() => handleDeletePeriod(id)}
                  >
                    <span className="text-sm">Remover Periodo</span>
                  </Button>
                )}
              </div>
            </div>

            <hr />
          </React.Fragment>
        )
      )}

      <div className="flex justify-end mt-4 ">
        <Button
          className="bg-secondary-500 w-full lg:w-1/3 h-7 text-sm"
          onClick={() => addPeriod()}
        >
          Adicionar período
        </Button>
      </div>

      <div className="hidden lg:flex lg:justify-center lg:mt-6 ">
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
