import {useParams} from "react-router-dom";
import {cn} from "../../../app/utils/cn";
import {Header} from "../../components/Header";
import {useUpdateUserRigs} from "./useUpdateUserRigs";
import {Spinner} from "../../components/Spinner";

export const UpdateUserRigs = () => {
  const {id} = useParams();
  const {
    isLoading,
    userBeingEdited,
    availableRigs,
    userRigs,
    handleLinkRig,
    handleUnlinkRig,
  } = useUpdateUserRigs(id!);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="SONDAS" subtitle="Editar sondas dos usuários" />

      <div className="lg:min-w-[1200px]  mx-auto max-w-[715px] h-2/3 bg-gray-400 p-4 gap-2 rounded-md flex flex-col lg:flex-row lg:justify-center ">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        )}

        {!isLoading && (
          <>
            {" "}
            <div className="bg-primary-500 h-full rounded-md p-4 lg:w-1/2">
              <span className="text-white tracking-[-0.5] mb-14 font-medium block">
                Sondas vinculadas ao usuário {userBeingEdited?.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {userRigs.map(({id, name, isActive}) => (
                  <div
                    key={id}
                    onClick={() => handleUnlinkRig(id)}
                    className="p-4 bg-white cursor-pointer rounded-2xl shadow-[0_1px_2px] flex w-1/3 justify-between items-center border-l-4  border-secondary-500 lg:w-2/3"
                  >
                    <span className="text-gray-800">{name}</span>
                    <span
                      className={cn(
                        "w-5 h-5 bg-secondary-500 rounded-full",
                        isActive === false && "bg-redAccent-500"
                      )}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-500 h-full rounded-md p-4 lg:w-1/2">
              <span className="text-white tracking-[-0.5] mb-14 font-medium block">
                Sondas vinculadas ao contrato do usuário
              </span>
              <div className="flex flex-wrap gap-2">
                {availableRigs.length === 0 && (
                  <span>Usuario cadastrado em todas as sondas do contrato</span>
                )}
                {availableRigs.length > 0 && (
                  <>
                    {availableRigs.map(({id, name}) => (
                      <div
                        key={id}
                        onClick={() => handleLinkRig(id)}
                        className="p-4 bg-white cursor-pointer rounded-2xl shadow-[0_1px_2px] flex w-1/3 justify-between items-center border-l-4  border-secondary-500 lg:w-2/3"
                      >
                        <span className="text-gray-800">{name}</span>
                        <span
                          className={cn(
                            "w-5 h-5 bg-secondary-500 rounded-full"
                          )}
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
    </div>
  );
};
