import {PlusIcon} from "@radix-ui/react-icons";
import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import {EditRigModal} from "./modals/EditRigModal";
import {ListRigsContext, ListRigsProvider} from "./ListRigsContext";
import {Button} from "@/components/ui/button";
import logo from "@/assets/images/bahia-flag.png";
import {Badge} from "@/components/ui/badge";

export const ListRigs = () => {
  return (
    <ListRigsProvider>
      <ListRigsContext.Consumer>
        {({isFetchingRigs, rigs, rigBeingEdited}) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header
              title="Sondas"
              displayRig={false}
              displayPeriodRange={false}
            />

            <div className="w-full h-full ">
              <div className="border border-b-2">
                {isFetchingRigs && (
                  <div className="flex justify-center items-center h-1/2">
                    <Spinner />
                  </div>
                )}
                {!isFetchingRigs && (
                  <div className=" grid grid-cols-12 auto-rows-[200px] p-4 justify-center  gap-4 ">
                    {/*  <div
                      onClick={() => navigate("/create-rig")}
                      className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex  h-20 gap-4 justify-center items-center border-l-4  border-primary lg:w-2/5 cursor-pointer"
                    >
                      <div className="h-11 w-11 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center">
                        <PlusIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      <span className="font-medium tracking-[-0.5px] block text-center  text-gray-600">
                        Adicionar Sonda
                      </span>
                    </div> */}
                    <Card className="cursor-pointer col-span-12 lg:col-span-3">
                      <CardHeader>
                        <CardTitle className="flex justify-center">
                          Criar uma nova Sonda
                        </CardTitle>
                        <CardDescription> </CardDescription>
                      </CardHeader>
                      <CardContent className=" h-[60%] flex justify-center items-center">
                        <div className="h-28 w-28 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center">
                          <PlusIcon className="w-6 h-6 text-gray-600" />
                        </div>
                      </CardContent>
                    </Card>
                    {rigs.map(({id, name, state, isActive}) => (
                      <Card
                        className=" col-span-12 lg:col-span-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col justify-around"
                        key={id}
                      >
                        <CardHeader className="flex flex-row gap-6  items-center">
                          <div className=" ">
                            <img
                              className="h-8 rounded-md shadow-[0px_3px_15px_#718096]"
                              src={logo}
                            />
                          </div>
                          <div className="flex-1 flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                              <CardTitle>{name}</CardTitle>
                              <CardDescription>{state}</CardDescription>
                            </div>
                            {isActive && (
                              <div>
                                <Badge className="bg-emerald-500">Ativa</Badge>
                              </div>
                            )}

                            {!isActive && (
                              <div>
                                <Badge variant="destructive">Desativada</Badge>
                              </div>
                            )}
                          </div>
                        </CardHeader>

                        <CardFooter className="flex justify-between ">
                          <Button className="w-full">Editar</Button>
                        </CardFooter>
                      </Card>
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
