import {useParams} from "react-router-dom";
import {cn} from "../../../app/utils/cn";
import {Header} from "../../components/Header";
import {useUpdateUserRigs} from "./useUpdateUserRigs";
import {Spinner} from "../../components/Spinner";
import {Button} from "../../components/Button";
import emptyState from "../../../assets/icons/emptyState.svg";

export const UpdateUserRigs = () => {
  const {id} = useParams();
  const {
    isLoading,
    userBeingEdited,
    availableRigs,
    userRigs,
    handleLinkRig,
    handleSubmit,
    handleUnlinkRig,
    isLoadingUpdateRigs,
  } = useUpdateUserRigs(id!);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        title="Editar Sondas dos usuário"
        displayRig={false}
        displayPeriodRange={false}
      />

      <div className="lg:min-w-[1200px]  mx-auto max-w-[715px]  bg-gray-400 p-4 gap-2 rounded-md flex flex-col lg:flex-row lg:justify-center ">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        )}

        {!isLoading && (
          <>
            {" "}
            <div className="bg-primary min-h-[380px] rounded-md p-4 lg:w-1/2">
              <span className="text-white tracking-[-0.5] mb-14 font-medium block">
                Sondas vinculadas à: {userBeingEdited?.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {userRigs.length === 0 && (
                  <div className="w-full h-full flex justify-center items-center flex-col">
                    <img src={emptyState} />
                    <h2 className="text-primary mt-1 flex-1">
                      <span className="text-white tracking-[-0.5] mb-14 font-medium block">
                        O usuário deve estar vinculado a, no mínimo, uma sonda.
                      </span>
                    </h2>
                  </div>
                )}
                {userRigs.length > 0 && (
                  <>
                    {userRigs.map(({id, name, isActive}) => (
                      <div
                        key={id}
                        onClick={() => handleUnlinkRig(id)}
                        className="p-4 bg-white cursor-pointer rounded-2xl shadow-[0_1px_2px] flex w-1/4 justify-between items-center border-l-4  border-secondary "
                      >
                        <span className="text-gray-800">{name}</span>
                        <span
                          className={cn(
                            "w-5 h-5 bg-secondary rounded-full",
                            isActive === false && "bg-redAccent-500"
                          )}
                        ></span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="bg-primary min-h-[380px] rounded-md p-4 lg:w-1/2">
              <span className="text-white tracking-[-0.5] mb-14 font-medium block">
                Sondas cadastradas no sistema
              </span>
              <div className="flex flex-wrap gap-2">
                {availableRigs.length === 0 && (
                  <div className="w-full h-full flex justify-center items-center flex-col">
                    <img src={emptyState} />
                    <h2 className="text-primary mt-1 flex-1">
                      <span className="text-white tracking-[-0.5] mb-14 font-medium block">
                        O usuário está cadastrado em todas as sondas associadas
                        ao contrato.
                      </span>
                    </h2>
                  </div>
                )}
                {availableRigs.length > 0 && (
                  <>
                    {availableRigs.map(({id, name}) => (
                      <div
                        key={id}
                        onClick={() => handleLinkRig(id)}
                        className="p-4 bg-white cursor-pointer rounded-2xl shadow-[0_1px_2px] flex w-1/4 justify-between items-center border-l-4  border-secondary "
                      >
                        <span className="text-gray-800">{name}</span>
                        <span
                          className={cn("w-5 h-5 bg-secondary rounded-full")}
                        ></span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full mt-4 flex justify-center">
        <Button
          onClick={() => handleSubmit()}
          isLoading={isLoading || isLoadingUpdateRigs}
          className="w-1/2"
          disabled={userRigs.length === 0 ? true : false || isLoadingUpdateRigs}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};
