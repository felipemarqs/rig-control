import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {useListUsers} from "./useListUsers";
import avatarIcon from "@/assets/icons/avatar.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Info, ListFilter} from "lucide-react";
import {formatLastlogin} from "@/app/utils/formatLastLogin";
import {Input} from "@/view/components/Input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {NotFound} from "@/view/components/NotFound";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const ListUsers = () => {
  const {
    filteredUsers,
    isFetchingUsers,
    orderByLastLogin,
    hasUsers,
    searchTerm,
    handleOrderByLastLogin,
    handleChangeSearchTerm,
  } = useListUsers();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="Usuários" displayRig={false} displayPeriodRange={false} />

      <div className="w-full h-full ">
        <div className="border border-b-2">
          {isFetchingUsers && (
            <div className="flex justify-center items-center h-1/2">
              <Spinner />
            </div>
          )}
          {!isFetchingUsers && (
            <div className="p-2 flex flex-col h-full  gap-4 lg:items-center lg:p-8">
              {/*    <div
                onClick={() => navigate("/create-user")}
                className=" p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex  h-20 gap-4 justify-center items-center border-l-4  border-primary lg:w-3/4 cursor-pointer"
              >
                <div className="h-11 w-11 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center">
                  <PlusIcon className="w-6 h-6 text-gray-600" />
                </div>
                <span className="font-medium tracking-[-0.5px] block text-center  text-gray-600">
                  Cadastre um novo usuário
                </span>
              </div> */}

              <div className=" lg:w-1/2 flex justify-between items-center gap-4">
                <div className="w-full">
                  <Input
                    onChange={(event) => handleChangeSearchTerm(event)}
                    name="search"
                    type="email"
                    placeholder="Pesquisar usuário"
                    labelStyles="text-gray-700"
                    className="text-black bg-white  border-gray-500 border hover:bg-gray-300 caret-gray-700"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Ordernar</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Últimos acessos</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuCheckboxItem
                      onSelect={() => handleOrderByLastLogin("DESC")}
                      checked={orderByLastLogin === "DESC"}
                    >
                      Mais Recentes
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onSelect={() => handleOrderByLastLogin("ASC")}
                      checked={orderByLastLogin === "ASC"}
                    >
                      Menos Recentes
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {hasUsers && (
                <div className=" grid grid-cols-12 auto-rows-[200px]  p-4 justify-center  gap-4 ">
                  {filteredUsers.map(({name, id, email, userLog}) => (
                    <Card
                      className=" col-span-12 lg:col-span-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col justify-around"
                      key={id}
                    >
                      <CardHeader className="flex">
                        <CardTitle className="flex justify-between flex-col gap-2 items-center ">
                          <Avatar>
                            <AvatarImage src={avatarIcon} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className=" flex-1 flex flex-col justify-center items-center">
                            <span>{name}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="">
                          <div className="flex justify-center gap-2">
                            <span>{email}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className=" flex justify-center items-center">
                        {Number(new Date(userLog[0].loginTime)) > 0 && (
                          <div className="flex justify-around">
                            <span className="text-sm">
                              Útimo login:{" "}
                              {formatLastlogin(userLog[0].loginTime)}
                            </span>
                          </div>
                        )}

                        {Number(new Date(userLog[0].loginTime)) === 0 && (
                          <div className="flex justify-around items-center">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="link">
                                  <Info className="text-redAccent-500" />
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                  <div className="space-y-1">
                                    <p className="text-sm">
                                      O usuário ainda não fez login no sistema
                                      após a atualização de 28/04/2024
                                    </p>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                            <span className="text-sm text-redAccent-500">
                              Útimo login: Não registrado
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!hasUsers && (
                <div className="mt-32 h-full">
                  <NotFound>
                    <span className="text-primary">
                      <strong>Nenhum usuário</strong> encontrado com o termo de
                      pesquisa <strong>{`"${searchTerm}"`}</strong>!
                    </span>
                  </NotFound>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
