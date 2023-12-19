import { PlusIcon } from "@radix-ui/react-icons";
import { Header } from "../../components/Header";
import { Spinner } from "../../components/Spinner";
import { useListUsers } from "./useListUsers";
import { Link } from "react-router-dom";

export const ListUsers = () => {
  const { users, isFetchingUsers, navigate } = useListUsers();

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
            <div className="p-2 flex flex-col h-full gap-4 lg:items-center lg:p-8">
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
                  className="p-4 grid grid-cols-12 auto-rows-[50px] gap-3 rounded-2xl shadow-[0_1px_2px] h-60 lg:h-44 justify-between border-l-4 border-primary-500  bg-white lg:w-3/4 "
                >
                  <div className="col-span-6 row-span-1 flex flex-col">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Nome
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {user.name}
                    </span>
                  </div>

                  <div className="col-span-12 row-span-1  flex flex-col lg:col-span-6">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Email
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {user.email}
                    </span>
                  </div>

                  <div className="col-span-4 row-span-1  flex flex-col lg:col-span-6">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Nv. de Acesso
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {user.accessLevel}
                    </span>
                  </div>

                  <div className="col-span-6 row-span-1  flex flex-col">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Contrato
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {user.accessLevel === "ADM" && "ADM"}
                      {user.accessLevel !== "ADM" &&
                        user.rigs[0].rig.contract.name}
                    </span>
                  </div>

                  <div className="col-span-12 row-span-1  flex flex-wrap justify-end">
                    {user.accessLevel !== "ADM" && (
                      <Link
                        className="text-primary-500 tracking-[-0.5] underline font-semibold px-2"
                        to={`/users/update-rigs/${user.id}`}
                      >
                        Visualizar Sondas
                      </Link>
                    )}
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
