import Checkbox from "../../../../components/CheckBox";
import {usePendingForm} from "../PendingFormContext/usePedingForm";

export const OrigemContainer = () => {
  const {
    isExtraTrailerSelected,
    handleExtraTrailerCheckbox,
    isPowerSwivelSelected,
    handlePowerSwivelCheckbox,
  } = usePendingForm();

  return (
    <div className="  bg-primary-500 py-4  my-4  rounded-xl ">
      <div className="p-4 rounded-xl flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Checkbox
            checked={isExtraTrailerSelected}
            id="extraTrailer"
            handleChecked={handleExtraTrailerCheckbox}
          >
            Trailer Extra
          </Checkbox>

          <Checkbox
            checked={isPowerSwivelSelected}
            id="PowerSwivel"
            handleChecked={handlePowerSwivelCheckbox}
          >
            Power Swivel
          </Checkbox>
        </div>
      </div>
    </div>
  );
};