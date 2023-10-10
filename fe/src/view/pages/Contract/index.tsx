import {PlusIcon} from "@radix-ui/react-icons";
import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {useContract} from "./useContract";

export const Contract = () => {
  const {contracts, isFetchingContracts, navigate} = useContract();
  //createContractconsole.log("contracts:", contracts);
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        title="CADASTRO"
        subtitle="Listagem de todos os contratos cadastrados no sistema"
      />

      <div className="w-full h-full ">
        <div className="border border-b-2">
          {isFetchingContracts && (
            <div className="flex justify-center items-center h-1/2">
              <Spinner />
            </div>
          )}
          {!isFetchingContracts && (
            <div className="p-8 flex flex-col h-full gap-4 lg:items-center">
              <div
                onClick={() => navigate("/create-contract")}
                className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex  h-20 gap-4 justify-center items-center border-l-4  border-primary-500 lg:w-3/4 cursor-pointer"
              >
                <div className="h-11 w-11 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center">
                  <PlusIcon className="w-6 h-6 text-gray-600" />
                </div>
                <span className="font-medium tracking-[-0.5px] block text-center  text-gray-600">
                  Adicionar Contrato
                </span>
              </div>
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex h-20 justify-between border-l-4  border-primary-500 lg:w-3/4"
                >
                  <div className="flex flex-col ">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Nome
                    </span>
                    <span className="text-gray-600 tracking-[-0.5] font-medium block">
                      {contract.name}
                    </span>
                  </div>

                  <div className="flex flex-col  w-1/2 ">
                    <span className="text-gray-800 tracking-[-0.5] font-medium block">
                      Sondas
                    </span>
                    <div className="flex gap-2">
                      {contract.rigs.map((rig) => (
                        <span
                          key={rig.id}
                          className="text-gray-600 tracking-[-0.5] font-medium block border-r-2 pr-2"
                        >
                          {rig.name}
                        </span>
                      ))}
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
