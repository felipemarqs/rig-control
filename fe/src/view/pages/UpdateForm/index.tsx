import {Header} from "../../components/Header";

import {cn} from "../../../app/utils/cn";
import {PeriodsFormContainer} from "./components/PeriodsFormContainer";
import {BraskemFormContainer} from "./components/BraskemForm";
import {
  UpdateFormContext,
  UpdateFormProvider,
} from "./components/UpdateFormContext";
import {TresRFormContainer} from "./components/TresRForm";
import {OrigemContainer} from "./components/OrigemForm";
import {CarmoEnergyContainer} from "./components/CarmoEnergyForm";
import {Button} from "../../components/Button";

export const UpdateForm = () => {
  return (
    <UpdateFormProvider>
      <UpdateFormContext.Consumer>
        {({
          isPending,
          remainingMinutes,
          isFormValid,
          handleSubmit,
          periods,
          isLoading,
          selectedContract,
        }) => (
          <div className="w-full h-full lg:min-w-[1000px]">
            <Header
              title=" Boletim Diário de Ocorrência"
              subtitle="Atualização dados de eficiência da sonda."
            />
            <div
              className={cn(
                "fixed  bg-redAccent-500  text-sm text-white p-1 lg:p-4 z-50 rounded-lg top-5 right-5",
                !isPending && "bg-secondary-500"
              )}
            >
              {isPending && <span> Minutos restantes: {remainingMinutes}</span>}
              {!isPending && <span> Horários Preenchidos!</span>}
            </div>

            <div className="w-full h-[80vh]  overflow-y-auto  flex-col justify-center flex gap-2  lg:h-[87vh] lg:flex-row lg:p-4">
              <PeriodsFormContainer />

              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "petrobrás" && <></>}

              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "braskem" && <BraskemFormContainer />}

              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "3r" && <TresRFormContainer />}

              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "origem" && <OrigemContainer />}

              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "carmo energy" && <CarmoEnergyContainer />}
            </div>

            <div className="flex justify-center mt-6 lg:hidden">
              <Button
                disabled={!isFormValid || isLoading}
                className="bg-secondary-500 w-2/3 "
                onClick={() => handleSubmit(periods)}
              >
                Enviar dados
              </Button>
            </div>
          </div>
        )}
      </UpdateFormContext.Consumer>
    </UpdateFormProvider>
  );
};
