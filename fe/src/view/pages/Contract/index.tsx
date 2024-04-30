import {Header} from "../../components/Header";
import {Spinner} from "../../components/Spinner";
import {useContract} from "./useContract";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Contract = () => {
  const {contracts, isFetchingContracts} = useContract();
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="Contratos" displayRig={false} displayPeriodRange={false}>
        <></>
      </Header>

      <div className="w-full h-full  flex flex-col items-center">
        <div className="border border-b-2 w-2/3">
          {isFetchingContracts && (
            <div className="flex justify-center items-center h-1/2">
              <Spinner />
            </div>
          )}
          {!isFetchingContracts && (
            <div className="p-8 flex flex-col h-full gap-4 lg:items-center bg-card rounded-sm  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="table-cell w-[100px] ">
                      <span className=" ">Empresa</span>
                    </TableHead>

                    <TableHead className="table-cell text-center ">
                      Total de Sondas
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Sondas
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map(({id, logoImagePath, rigs}) => (
                    <TableRow key={id}>
                      <TableCell className="table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-contain"
                          height="64"
                          src={logoImagePath}
                          width="64"
                        />
                      </TableCell>

                      <TableCell className="table-cell text-center">
                        {rigs.length}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center gap-x-4">
                        {rigs.map(({name}) => (
                          <span className="ml-2">{name}</span>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
