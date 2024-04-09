import Checkbox from "../../../../components/CheckBox";

import {Select} from "../../../../components/Select";
import {usePendingForm} from "../PendingFormContext/usePedingForm";

export const CarmoEnergyContainer = () => {
  const {
    isMobilizationSelected,
    handleMobilizationCheckbox,
    mobilizationPlace,
    handleMobilizationPlace,
    isSuckingTruckSelected,
    handleSuckingTruckCheckbox,
  } = usePendingForm();

  return (
    <div className="bg-primary py-4  w-1/2 my-4  rounded-xl ">
      <div className="p-4 rounded-xl flex flex-col gap-2">
        <div className="flex gap-2 items-center justify-center">
          <div className="flex-1">
            <Checkbox
              checked={isMobilizationSelected}
              id="mobilization"
              handleChecked={handleMobilizationCheckbox}
            >
              Mobilização
            </Checkbox>
          </div>

          <div className="flex-1">
            <Select
              disabled={!isMobilizationSelected}
              placeholder="Em"
              value={mobilizationPlace}
              onChange={(value) => handleMobilizationPlace(value)}
              options={[
                {
                  value: "Aracaju",
                  label: "Aracaju",
                },
                {
                  value: "Bahia",
                  label: "Bahia",
                },
              ]}
            />
          </div>
        </div>

        <div>
          <Checkbox
            checked={isSuckingTruckSelected}
            id="suckingTruck"
            handleChecked={handleSuckingTruckCheckbox}
          >
            Caminhão Sugador
          </Checkbox>
        </div>
      </div>
    </div>
  );
};
