import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";
import {formatCurrency} from "../../../../../app/utils/formatCurrency";
import {totalsInterface} from "../../../../../app/utils/getTotals";
import {
  taxNames,
  taxSuffix,
  taxTranslation,
} from "../../../../../app/utils/taxLabels";
import {formatCurrencyStringToNegativeNumber} from "@/app/utils/formatCurrencyStringToNegativeNumber";

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
            <div className="text-gray-800 font-medium tracking-tighter">
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
            <div className="text-gray-800 font-medium tracking-tighter">
              {`${params.value?.toFixed(2)} ${suffix}`}
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
        console.log("params", params.value);

        if (
          params.row.id === "repairhouramount-total" ||
          params.row.id === "glosshouramount-total"
        ) {
          return (
            <div className="w-full flex justify-center items-center">
              {params.value > 0 && (
                <div className="text-redAccent-500 font-semibold ">
                  {formatCurrencyStringToNegativeNumber(
                    formatCurrency(params.value)
                  )}
                </div>
              )}
              {params.value === 0 && (
                <div className="text-gray-800 font-semibold ">
                  {formatCurrency(params.value)}
                </div>
              )}
            </div>
          );
        }
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-gray-800 font-semibold ">
              {formatCurrency(params.value)}
            </div>
          </div>
        );
      },
    });
  });

  const rigNames = Array.from(new Set(billing.map((item) => item.rigname)));

  // Criar a tabela com as taxas como linhas e sondas como colunas

  const tableData = taxNames.map((taxa) => {
    const rowData: any = {
      id: `${taxa}-total`,
      taxa: taxTranslation[taxa] || taxa,
    };

    rigNames.forEach((rigname) => {
      const rigData: any = billing.find((item) => item.rigname === rigname);

      console.log("Row Data", rowData);
      rowData[rigname] = rigData ? rigData[taxa] : 0;
      rowData["qtd"] = totals[taxa as keyof totalsInterface];
    });

    return rowData;
  });

  return {
    columns,
    data: tableData,
  };
};
