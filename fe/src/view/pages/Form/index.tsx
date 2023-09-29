import {Header} from "../../components/Header";

import {cn} from "../../../app/utils/cn";
import {PeriodsFormContainer} from "./components/PeriodsFormContainer";
import {BraskemFormContainer} from "./components/BraskemForm";
import {FormContext, FormProvider} from "./components/FormContext";
import {TresRFormContainer} from "./components/TresRForm";
import {OrigemContainer} from "./components/OrigemForm";
import {CarmoEnergyContainer} from "./components/CarmoEnergyForm";

export const Form = () => {
  return (
    <FormProvider>
      <FormContext.Consumer>
        {({isPending, remainingMinutes, userRig}) => (
          <div className="w-full h-full lg:min-w-[1000px]">
            <Header
              title=" Boletim Diário de Ocorrência"
              subtitle="Submissão dos dados de eficiência da sonda."
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

            <div className="w-full h-[87vh] p-4  justify-center flex gap-2 ">
              <PeriodsFormContainer />

              {userRig.contract.name === "Petrobrás" && <></>}

              {userRig.contract.name === "Braskem" && <BraskemFormContainer />}

              {userRig.contract.name === "3R" && <TresRFormContainer />}

              {userRig.contract.name === "Origem" && <OrigemContainer />}

              {userRig.contract.name === "Carmo Energy" && (
                <CarmoEnergyContainer />
              )}
            </div>
          </div>
        )}
      </FormContext.Consumer>
    </FormProvider>
  );
};
