import {PlusIcon} from "@radix-ui/react-icons";
import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {useFormMenu} from "./useFormMenu";
import {Link} from "react-router-dom";
import {formatDate} from "../../../app/utils/formatDate";
import {TrashIcon} from "lucide-react";
import {DeleteModal} from "../../components/DeleteModal";

export const FormMenu = () => {
  const {
    temporaryEfficiency,
    navigate,
    isFetchingTemporaryEfficiencies,
    closeDeleteModal,
    isDeleteModalOpen,
    openDeleteModal,
    handleDeleteEfficiency,
    isLoadingRemoveEfficiency,
  } = useFormMenu();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        title="BOLETIMS"
        subtitle="Listagem de boletins de ocorrência salvos pelo usuário cadastrados no sistema"
      />

      <div className="w-full h-full ">
        <div className="border border-b-2">
          {isFetchingTemporaryEfficiencies && (
            <div className="flex justify-center items-center h-1/2">
              <Spinner />
            </div>
          )}
          {!isFetchingTemporaryEfficiencies && (
            <div className="p-2 flex flex-col h-full gap-4 lg:items-center lg:p-8">
              <div
                onClick={() => navigate("/form")}
                className="p-4 bg-primary-500 rounded-md shadow-[0_1px_2px] flex  h-20 gap-4 justify-center items-center border-l-4  border-primary-500 lg:w-3/4 cursor-pointer"
              >
                <div className="h-11 w-11 rounded-full border-2 border-dashed border-white flex justify-center items-center">
                  <PlusIcon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium tracking-[-0.5px] block text-center  text-white">
                  Iniciar um novo Boletim de Ocorência
                </span>
              </div>

              <div className="w-full mt-8">
                <span className="font-semibold text-2xl tracking-[-0.5px] block text-center  text-gray-600">
                  Boletim de Ocorência salvo
                </span>
              </div>

              <div className="p-4 flex flex-col gap-2 rounded-md shadow-[0_0_4px] justify-between  lg:w-3/4 ">
                {temporaryEfficiency && !Array.isArray(temporaryEfficiency) && (
                  <div className="flex">
                    <div className="flex flex-col">
                      <div className="flex gap-4">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Data:
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {formatDate(new Date(temporaryEfficiency.date))}
                        </span>
                      </div>

                      <div className="flex gap-4">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Poço:
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {temporaryEfficiency.well}
                        </span>
                      </div>

                      <div className="flex gap-4">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Horas Disponíveis:
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {temporaryEfficiency.availableHours}
                        </span>
                      </div>

                      <div className="flex gap-4">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Quantidade de períodos:
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {temporaryEfficiency.temporaryPeriods.length}
                        </span>
                      </div>
                    </div>

                    <div className="  flex justify-end items-center flex-1 gap-2 ">
                      <button
                        onClick={openDeleteModal}
                        className="text-white bg-redAccent-500 w-10 h-10 flex justify-center items-center rounded-md hover:bg-redAccent-400 duration-250 active:bg-redAccent-700 transition-all "
                      >
                        <TrashIcon className="text-white" />
                      </button>
                      <Link
                        className="text-white tracking-[-0.5]  font-semibold px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600"
                        to={`/pending-form/${temporaryEfficiency.id}`}
                      >
                        Continuar Boletim
                      </Link>
                    </div>
                    <DeleteModal
                      title=" Tem certeza que deseja excluir esse registro?"
                      description="Essa ação NÃO poderá ser desfeita."
                      open={isDeleteModalOpen}
                      onClose={closeDeleteModal}
                      onConfirm={handleDeleteEfficiency}
                      isLoading={isLoadingRemoveEfficiency}
                    />
                  </div>
                )}

                {!temporaryEfficiency && (
                  <div className="text-gray-600 tracking-[-0.5] font-medium  p-6 flex justify-center items-center">
                    Você não tem registro salvo. Inicie um novo boletim acima!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
