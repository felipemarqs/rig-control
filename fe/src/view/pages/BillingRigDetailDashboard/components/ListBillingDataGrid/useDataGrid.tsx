import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";
import {formatCurrency} from "../../../../../app/utils/formatCurrency";

export const useDataGrid = () => {
  const {billings} = useBillingRigDetailDashboard();

  const columns: GridColDef[] = [
    {
      field: "taxa",
      headerName: "Taxa",
      flex: 0.7,
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
  ];

  billings.forEach(({rigname}) => {
    columns.push({
      field: rigname,
      headerName: rigname,
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

  const rigNames = Array.from(new Set(billings.map((item) => item.rigname)));

  const taxaNames = [
    "availablehouramount",
    "glosshouramount",
    "dtmlt20amount",
    "dtmbt20and50amount",
    "dtmgt50amount",
    "fluidlt20amount",
    "fluidbt20and50amount",
    "fluidgt50amount",
    "equipmentlt20amount",
    "equipmentbt20and50amount",
    "equipmentgt50amount",
  ];

  const taxaTranslation: Record<string, string> = {
    availablehouramount: "Horas Disponíveis",
    glosshouramount: "Horas Glosa",
    dtmlt20amount: "DTM < 20",
    dtmbt20and50amount: "DTM 20-50",
    dtmgt50amount: "DTM > 50",
    fluidlt20amount: "Taxa de Fluido < 20",
    fluidbt20and50amount: "Taxa de Fluido 20-50",
    fluidgt50amount: "Taxa de Fluido > 50",
    equipmentlt20amount: "Taxa de Equipamento < 20",
    equipmentbt20and50amount: "Taxa de Equipamento 20-50",
    equipmentgt50amount: "Taxa de Equipamento > 50",
  };

  // Criar a tabela com as taxas como linhas e sondas como colunas

  const tableData = taxaNames.map((taxa) => {
    const rowData: any = {
      id: `${taxa}-total`,
      taxa: taxaTranslation[taxa] || taxa,
    };
    rigNames.forEach((rigname) => {
      const rigData: any = billings.find((item) => item.rigname === rigname);
      rowData[rigname] = rigData ? rigData[taxa] : 0;
    });
    return rowData;
  });

  return {
    columns,
    data: tableData,
  };
};
