// Importações necessárias
import {Header} from "../../components/Header";
import {cn} from "../../../app/utils/cn";
import {PeriodsFormContainer} from "./components/PeriodsFormContainer";
//import {BraskemFormContainer} from "./components/BraskemForm";
import {FormContext, FormProvider} from "./components/FormContext";
import {TresRFormContainer} from "./components/TresRForm";
import {OrigemContainer} from "./components/OrigemForm";
import {CarmoEnergyContainer} from "./components/CarmoEnergyForm";
import {Button} from "../../components/Button";
import {Select} from "../../components/Select";
import {DatePickerInput} from "../../components/DatePickerInput";
import {BraskemFormContainer} from "./components/BraskemFormContainer";
import {ChevronDown} from "lucide-react";
import {PageLoader} from "../../components/PageLoader";

// Componente principal Form
export const Form = () => {
  /*  const {height, opacity} = useSpring({
    from: {height: isVisible ? 0 : "auto", opacity: isVisible ? 0 : 1},
    to: {height: isVisible ? "auto" : 0, opacity: isVisible ? 1 : 0},
  }); */

  return (
    // Fornecer o contexto do formulário
    <FormProvider>
      {/* Consumir o contexto do formulário */}
      <FormContext.Consumer>
        {({
          isPending,
          isDateValid,
          remainingMinutes,
          selectedContract,
          selectedRig,
          handleChangeRig,
          getErrorMessageByFildName,
          handleDateChange,
          date,
          usersRigs,
          toggleVisibility,
          isVisible,
          handleConfirmButton,
          isConfigsConfirmed,
          isLoading,
        }) => (
          // Estrutura principal do formulário
          <div className="w-full h-full overflow-y-scroll lg:min-w-[1000px]">
            {/* Cabeçalho */}
            <Header
              title=" Boletim Diário de Ocorrência"
              subtitle="Selecione a sonda em atividade e preencha suas configurações para
              adicionar novos períodos"
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

            <div
              className={cn(
                `flex flex-col items-center justify-center gap-1 mt-26 bg-gray-500 mx-10 `
              )}
            >
              <header
                className={cn(
                  `w-full p-4  flex justify-between items-center transition-all ease-in-out duration-500 ${
                    isVisible ? "border-b-2 border-primary-500" : ""
                  }`
                )}
              >
                <h2 className="text-primary-500 font-bold">
                  Configurações da Sonda:
                </h2>

                <button
                  onClick={() => toggleVisibility()}
                  className={`text-white bg-primary-500 w-12 h-12 flex justify-center items-center rounded-full transform transition-transform duration-200 ease-in ${
                    isVisible ? "-rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown />
                </button>

                {/*  {isVisible ? (
                  <button className=" text-white bg-primary-500 w-12 h-12 flex justify-center items-center rounded-full ">
                    <ChevronDown onClick={() => toggleVisibility()} />
                  </button>
                ) : (
                  <button className=" text-white bg-primary-500 w-12 h-12 flex justify-center items-center rounded-full ">
                    <ChevronUp onClick={() => toggleVisibility()} />
                  </button>
                )} */}
              </header>

              <div
                className={cn(
                  `w-full overflow-hidden transition-all ${
                    isVisible ? "max-h-[1000px]" : "max-h-0"
                  } transition-height ease-in-out duration-500`
                )}
              >
                {/*  <animated.div style={{height, opacity}}> */}
                <div
                  className={`flex gap-2 w-full px-6 overflow-hidden transition-all ease-in-out duration-200  mt-5`}
                >
                  <DatePickerInput
                    error={getErrorMessageByFildName("date")}
                    value={date}
                    onChange={(value) => handleDateChange(value)}
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
                <div className="flex justify-center">
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
                <div className="flex justify-end w-full py-4 px-8">
                  <Button
                    disabled={!(selectedRig && !isDateValid)}
                    className="bg-primary-500  w-1/2 lg:w-1/5 "
                    onClick={() => handleConfirmButton()}
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>

            {/* Componentes do formulário organizados em um layout flex */}
            {isConfigsConfirmed && (
              <div className="h-[80vh] mx-10   flex-col justify-center flex   lg:flex-row ">
                <PeriodsFormContainer />
                {/* Condicionalmente renderiza diferentes formulários com base no contrato selecionado */}
              </div>
            )}

            {/* Botão para enviar dados (visível apenas em telas menores) */}
            {/*  <div className="flex justify-center mt-6 ">
              <Button
                disabled={!isFormValid || isLoading}
                className="bg-secondary-500 w-2/3 "
                onClick={() => handleSubmit(periods)}
              >
                Enviar dados
              </Button>
            </div> */}
            <PageLoader isLoading={isLoading} />
          </div>
        )}
      </FormContext.Consumer>
    </FormProvider>
  );
};
