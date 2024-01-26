import {PlusIcon} from "@radix-ui/react-icons";
import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";

import {cn} from "../../../app/utils/cn";
import {EditRigModal} from "./modals/EditRigModal";
import {ListRigsContext, ListRigsProvider} from "./ListRigsContext";

export const ListRigs = () => {
  return (
    <ListRigsProvider>
      <ListRigsContext.Consumer>
        {({
          isFetchingRigs,
          rigs,
          navigate,
          handleSetRigBeingEdited,
          rigBeingEdited,
        }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header
              title="SONDAS"
              subtitle="Listagem de todas as sondas cadastradas no sistema"
            />

            <div className="w-full h-full ">
              <div className="border border-b-2">
                {isFetchingRigs && (
                  <div className="flex justify-center items-center h-1/2">
                    <Spinner />
                  </div>
                )}
                {!isFetchingRigs && (
                  <div className="p-8 flex flex-col h-full gap-4 lg:items-center">
                    <div
                      onClick={() => navigate("/create-rig")}
                      className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex  h-20 gap-4 justify-center items-center border-l-4  border-primary-500 lg:w-2/5 cursor-pointer"
                    >
                      <div className="h-11 w-11 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center">
                        <PlusIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      <span className="font-medium tracking-[-0.5px] block text-center  text-gray-600">
                        Adicionar Sonda
                      </span>
                    </div>
                    {rigs.map(({id, name, state, isActive}) => (
                      <div
                        key={id}
                        className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex flex-col gap-2 justify-between border-l-4  border-primary-500 lg:w-2/5"
                      >
                        <div className="w-full flex justify-between">
                          <div className="flex flex-col ">
                            <span className="text-gray-800 tracking-[-0.5] font-medium block">
                              Nome
                            </span>
                            <span className="text-gray-600 tracking-[-0.5] font-medium block">
                              {name}
                            </span>
                          </div>

                          <div className="flex flex-col ">
                            <span className="text-gray-800 tracking-[-0.5] font-medium block">
                              Estado
                            </span>
                            <span className="text-gray-600 tracking-[-0.5] font-medium block">
                              {state}
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex justify-between">
                          <div className="flex flex-col ">
                            <span className="text-gray-800 tracking-[-0.5] font-medium block">
                              {isActive ? "Ativa" : "Desativada"}
                            </span>
                            <span
                              className={cn(
                                "w-5 h-5 bg-secondary-500 rounded-full",
                                isActive === false && "bg-redAccent-500"
                              )}
                            ></span>
                          </div>

                          <span
                            className="text-primary-500 tracking-[-0.5] underline font-semibold cursor-pointer"
                            onClick={() => handleSetRigBeingEdited(id)}
                          >
                            Editar Sonda
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {rigBeingEdited && <EditRigModal />}
          </div>
        )}
      </ListRigsContext.Consumer>
    </ListRigsProvider>
  );
};
