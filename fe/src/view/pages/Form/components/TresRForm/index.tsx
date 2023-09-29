import Checkbox from "../../../../components/CheckBox";
import {useForm} from "../FormContext/useForm";
import {Input} from "../../../../components/Input";

export const TresRFormContainer = () => {
  const {
    isTruckCartSelected,
    handleTruckCartCheckbox,
    isTruckTankSelected,
    handleTruckTankCheckbox,
    isMunckSelected,
    handleMunckCheckbox,
    isTransportationSelected,
    handleTransportationCheckbox,
    truckKm,
    handleTruckKmChange,
    isMobilizationSelected,
    handleMobilizationCheckbox,
  } = useForm();

  return (
    <div className=" max-h-[90vh] overflow-y-scroll flex-1 max-w-[800px]  bg-primary-500 p-4 rounded-xl">
      <div className="border p-4 rounded-xl flex flex-col gap-2">
        <div className="border-b py-2 ">
          <div className="w-1/2 flex gap-4 items-center justify-between">
            <span className="text-white">Km Caminhão:</span>
            <div className="w-1/2 flex ">
              <Input
                value={truckKm}
                onChange={(event) =>
                  handleTruckKmChange(Number(event.target.value))
                }
                name="truckKm"
                className="  bg-white hover:bg-gray-100 hover:border-3  text-gray-800 font-bold tracking-[-1px] "
                type="number"
                step=".1"
                placeholder="Km"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Checkbox
            checked={isTruckCartSelected}
            id="truckCart"
            handleChecked={handleTruckCartCheckbox}
          >
            Taxa Loc. Caminhão + Carreta
          </Checkbox>

          <Checkbox
            checked={isTruckTankSelected}
            id="truckTank"
            handleChecked={handleTruckTankCheckbox}
          >
            Taxa Loc. Caminhão + Tanque
          </Checkbox>

          <Checkbox
            checked={isMunckSelected}
            id="munck"
            handleChecked={handleMunckCheckbox}
          >
            Taxa Loc. Munck Diaria
          </Checkbox>

          <Checkbox
            checked={isTransportationSelected}
            id="transportation"
            handleChecked={handleTransportationCheckbox}
          >
            Transporte RNxBA ou BAxRN
          </Checkbox>

          <Checkbox
            checked={isMobilizationSelected}
            id="mobilization"
            handleChecked={handleMobilizationCheckbox}
          >
            Mobilização
          </Checkbox>
        </div>
      </div>
    </div>
  );
};
