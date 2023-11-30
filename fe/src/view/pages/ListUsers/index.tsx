import {PlusIcon} from "@radix-ui/react-icons";
import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {useListUsers} from "./useListUsers";
import {Link} from "react-router-dom";

export const ListUsers = () => {
  const {users, isFetchingUsers, navigate} = useListUsers();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        title="USUÁRIOS"
        subtitle="Listagem de todos os usuários cadastrados no sistema"
      />

      <div className="w-full h-full ">
        <div className="border border-b-2">
          <h1 className="text-xl text-primary-500 pl-8">
            Usuários Cadastrados:
          </h1>
          {isFetchingUsers && (
            <div className="flex justify-center items-center h-1/2">
              <Spinner />
            </div>
          )}
          {!isFetchingUsers && (
            <div className="p-8 flex flex-col h-full gap-4 lg:items-center">
              <div
                onClick={() => navigate("/create-user")}
                className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex  h-20 gap-4 justify-center items-center border-l-4  border-primary-500 lg:w-3/4 cursor-pointer"
              >
                <div className="h-11 w-11 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center">
                  <PlusIcon className="w-6 h-6 text-gray-600" />
                </div>
                <span className="font-medium tracking-[-0.5px] block text-center  text-gray-600">
                  Cadastre um novo usuário
                </span>
              </div>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex-col flex h-40 justify-between border-l-4  border-primary-500 lg:w-3/4"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                      <span className="text-gray-800 tracking-[-0.5] font-medium block">
                        Nome
                      </span>
                      <span className="text-gray-600 tracking-[-0.5] font-medium block">
                        {user.name}
                      </span>
                    </div>

                    <div className="flex flex-col w-1/2 ">
                      <span className="text-gray-800 tracking-[-0.5] font-medium block">
                        Sondas
                      </span>
                      <div className="flex gap-2">
                        {user.rigs.map((rig) => (
                          <span
                            key={rig.rig.id}
                            className="text-gray-600 tracking-[-0.5] font-medium block border-r-2 pr-2"
                          >
                            {rig.rig.name}
                          </span>
                        ))}
                        {user.accessLevel !== "ADM" && (
                          <Link
                            className="text-primary-500 tracking-[-0.5] underline font-semibold"
                            to={`/users/update-rigs/${user.id}`}
                          >
                            Editar Sondas
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between  w-full">
                    <div className="flex flex-col w-1/2">
                      <span className="text-gray-800 tracking-[-0.5] font-medium block">
                        Email
                      </span>
                      <span className="text-gray-600 tracking-[-0.5] font-medium block">
                        {user.email}
                      </span>
                    </div>

                    <div className="w-1/2 flex justify-between">
                      <div className="flex flex-col ">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Contrato
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {user.accessLevel === "ADM" && "ADM"}
                          {user.accessLevel !== "ADM" &&
                            user.rigs[0].rig.contract.name}
                        </span>
                      </div>

                      <div className="flex flex-col ">
                        <span className="text-gray-800 tracking-[-0.5] font-medium block">
                          Nível de Acesso
                        </span>
                        <span className="text-gray-600 tracking-[-0.5] font-medium block">
                          {user.accessLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
