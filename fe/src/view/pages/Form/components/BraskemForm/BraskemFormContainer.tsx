import Checkbox from "../../../../components/CheckBox";
import {useForm} from "../FormContext/useForm";

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
  } = useForm();

  return (
    <div className=" max-h-[90vh] overflow-y-scroll flex-1 max-w-[800px]  bg-primary-500 p-4 rounded-xl">
      <div className="border p-4 rounded-xl flex flex-col gap-2">
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
  );
};
