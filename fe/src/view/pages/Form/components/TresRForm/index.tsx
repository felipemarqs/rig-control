import {TimePicker} from "antd";
import Checkbox from "../../../../components/CheckBox";
import {useForm} from "../FormContext/useForm";

export const TresRFormContainer = () => {
  const {
    handleBobRentHours,
    handleChristmasTreeDisassemblyHours,
    isTruckCartSelected,
    handleTruckCartCheckbox,
    isTruckTankSelected,
    handleTruckTankCheckbox,
    isMunckSelected,
    handleMunckCheckbox,
    isTransportationSelected,
    handleTransportationCheckbox,
  } = useForm();
  const format = "HH:mm";

  return (
    <div className=" max-h-[90vh] overflow-y-scroll flex-1 max-w-[800px]  bg-primary-500 p-4 rounded-xl">
      <div className="border p-4 rounded-xl flex flex-col gap-2">
        <div className="border-b py-2 flex flex-col gap-2 items-start justify-between"></div>

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
        </div>
      </div>
    </div>
  );
};
