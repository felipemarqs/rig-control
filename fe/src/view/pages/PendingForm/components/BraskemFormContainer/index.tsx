import {TimePicker} from "antd";
import Checkbox from "../../../../components/CheckBox";
import {usePendingForm} from "../PendingFormContext/usePedingForm";

export const BraskemFormContainer = () => {
  const {
    isMixTankSelected,
    handleMixTankCheckBox,
    handleMixTankOperatorsCheckBox,
    isMixTankOperatorsSelected,
    isMixTankMonthSelected,
    handleMixTankMonthCheckBox,
    handleFuelGeneratorCheckBox,
    isFuelGeneratorSelected,
    handleMobilizationCheckbox,
    isMobilizationSelected,
    isDemobilizationSelected,
    handleDemobilizationCheckbox,
    isTankMixMobilizationSelected,
    isTankMixDemobilizationSelected,
    handleTankMixMobilizationCheckbox,
    handleTankMixDemobilizationCheckbox,
    isTankMixDTMSelected,
    handleTankMixDTMCheckbox,
    handleBobRentHours,
    handleChristmasTreeDisassemblyHours,
  } = usePendingForm();
  const format = "HH:mm";

  return (
    <div className="  bg-primary py-4  my-4  rounded-xl ">
      <div className="p-4 rounded-xl flex flex-col gap-2">
        <div className="border-b py-2 flex flex-col gap-2 items-start justify-between ">
          <div className="flex gap-2 items-center justify-between  w-full">
            <span className="text-white">Tempo de locação de Bob:</span>
            <TimePicker
              placeholder="hh:mm"
              className="bg-white  text- border rounded-md px-2 py-1 text-gray-800"
              style={{
                color: "black",
              }}
              popupClassName="custom-timepicker-popup"
              onChange={(time, timeString) =>
                handleBobRentHours(time, timeString as string)
              }
              format={format}
            />
          </div>

          <div className="flex gap-2   items-center justify-between  w-full">
            <span className="text-white">Tempo de Desmont. Árvore Natal:</span>
            <TimePicker
              placeholder="hh:mm"
              className="bg-white  text- border rounded-md px-2 py-1 text-gray-800"
              style={{
                color: "black",
              }}
              popupClassName="custom-timepicker-popup"
              onChange={(time, timeString) =>
                handleChristmasTreeDisassemblyHours(time, timeString as string)
              }
              format={format}
            />
          </div>
        </div>

        <div className="flex gap-1">
          <div className="flex flex-1 flex-col gap-2 ">
            <Checkbox
              checked={isMixTankSelected}
              id="mixTank"
              handleChecked={handleMixTankCheckBox}
            >
              Tanque Mix em Serviço
            </Checkbox>

            <Checkbox
              checked={isMixTankOperatorsSelected}
              id="mixTankOperators"
              handleChecked={handleMixTankOperatorsCheckBox}
            >
              Operadores de Tanque Mix
            </Checkbox>

            <Checkbox
              checked={isMixTankMonthSelected}
              id="mixTankMonth"
              handleChecked={handleMixTankMonthCheckBox}
            >
              Taxa de Cobrança Mensal de Tanque Mix
            </Checkbox>

            <Checkbox
              checked={isTankMixMobilizationSelected}
              id="mixTankMobilization"
              handleChecked={handleTankMixMobilizationCheckbox}
            >
              Mobilização de Tanque Mix
            </Checkbox>

            <Checkbox
              checked={isTankMixDemobilizationSelected}
              id="mixTankDemobilization"
              handleChecked={handleTankMixDemobilizationCheckbox}
            >
              Desbobilização de Tanque Mix
            </Checkbox>
          </div>

          <div className="flex flex-1 flex-col gap-2 ">
            <Checkbox
              checked={isTankMixDTMSelected}
              id="mixTankDTM"
              handleChecked={handleTankMixDTMCheckbox}
            >
              DTM Tanque Mix
            </Checkbox>

            <Checkbox
              checked={isFuelGeneratorSelected}
              id="isFuelGenerator"
              handleChecked={handleFuelGeneratorCheckBox}
            >
              Diária de Combustível Gerador
            </Checkbox>

            <Checkbox
              checked={isMobilizationSelected}
              id="mobilization"
              handleChecked={handleMobilizationCheckbox}
            >
              Mobilização
            </Checkbox>

            <Checkbox
              checked={isDemobilizationSelected}
              id="demobilization"
              handleChecked={handleDemobilizationCheckbox}
            >
              Desmobilização
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};
