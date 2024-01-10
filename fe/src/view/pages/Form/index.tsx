// Importações necessárias
import {Header} from "../../components/Header";
import {cn} from "../../../app/utils/cn";
import {PeriodsFormContainer} from "./components/PeriodsFormContainer";
import {BraskemFormContainer} from "./components/BraskemForm";
import {FormContext, FormProvider} from "./components/FormContext";
import {TresRFormContainer} from "./components/TresRForm";
import {OrigemContainer} from "./components/OrigemForm";
import {CarmoEnergyContainer} from "./components/CarmoEnergyForm";
import {Button} from "../../components/Button";

// Componente principal Form
export const Form = () => {
  return (
    // Fornecer o contexto do formulário
    <FormProvider>
      {/* Consumir o contexto do formulário */}
      <FormContext.Consumer>
        {({
          isPending,
          remainingMinutes,
          isFormValid,
          handleSubmit,
          periods,
          isLoading,
          selectedContract,
        }) => (
          // Estrutura principal do formulário
          <div className="w-full h-full lg:min-w-[1000px]">
            {/* Cabeçalho */}
            <Header
              title=" Boletim Diário de Ocorrência"
              subtitle="Submissão dos dados de eficiência da sonda."
            />
            {/* Exibição do estado do formulário */}
            <div
              className={cn(
                "fixed  bg-redAccent-500  text-sm text-white p-1 lg:p-4 z-50 rounded-lg top-5 right-5",
                !isPending && "bg-secondary-500"
              )}
            >
              {isPending && <span> Minutos restantes: {remainingMinutes}</span>}
              {!isPending && <span> Horários Preenchidos!</span>}
            </div>

            {/* Componentes do formulário organizados em um layout flex */}
            <div className="w-full h-[80vh]  overflow-y-auto  flex-col justify-center flex gap-2  lg:h-[87vh] lg:flex-row lg:p-4">
              <PeriodsFormContainer />{" "}
              {/* Condicionalmente renderiza diferentes formulários com base no contrato selecionado */}
              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "petrobrás" && <></>}
              {(selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "braskem" ||
                selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                  "braském") && <BraskemFormContainer />}
              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "3r" && <TresRFormContainer />}
              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "origem" && <OrigemContainer />}
              {selectedContract?.rig.contract.name.toLocaleLowerCase() ===
                "carmo energy" && <CarmoEnergyContainer />}
            </div>

            {/* Botão para enviar dados (visível apenas em telas menores) */}
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
      </FormContext.Consumer>
    </FormProvider>
  );
};
