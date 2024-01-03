import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";
import {formatCurrency} from "../../../../../app/utils/formatCurrency";
import {totalsInterface} from "../../../../../app/utils/getTotals";
import {
  taxNames,
  taxSuffix,
  taxTranslation,
} from "../../../../../app/utils/taxLabels";

export const useDataGrid = () => {
  const {billing, totals} = useBillingRigDetailDashboard();

  const getSuffix = (params: string) => {
    taxSuffix;
    let suffix = taxSuffix[params.split("-")[0]];
    return suffix ?? "Und";
  };

  const columns: GridColDef[] = [
    {
      field: "taxa",
      headerName: "Taxa",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold  py-2 px-6 rounded-sm">
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "qtd",
      headerName: "Quantidade",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        //Função para retornar o tipo do Sufixo para mostrar na Data Table sendo 'Hrs' ou 'Und'
        const suffix = getSuffix(params.row.id);

        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold  py-2 px-6 rounded-sm">
              {`${params.value} ${suffix}`}
            </div>
          </div>
        );
      },
    },
  ];

  billing.forEach(({rigname}) => {
    columns.push({
      field: rigname,
      headerName: "VB (R$)",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white  bg-primary-500 py-1 px-6 rounded-sm">
              {formatCurrency(params.value)}
            </div>
          </div>
        );
      },
    });
  });

  const rigNames = Array.from(new Set(billing.map((item) => item.rigname)));

  // Criar a tabela com as taxas como linhas e sondas como colunas

  const tableData = taxNames.map((taxa, index) => {
    const rowData: any = {
      id: `${taxa}-total`,
      taxa: taxTranslation[taxa] || taxa,
    };
    /*  if (index === 1) {
      console.log("rigNames", rigNames);
      console.log("billings", billing);
    } */

    rigNames.forEach((rigname) => {
      const rigData: any = billing.find((item) => item.rigname === rigname);

      rowData[rigname] = rigData ? rigData[taxa] : 0;
      rowData["qtd"] = totals[taxa as keyof totalsInterface];
    });

    return rowData;
  });

  // console.log("tableData", tableData);

  return {
    columns,
    data: tableData,
  };
};
