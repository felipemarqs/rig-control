import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useBillingRigDetailDashboard} from "../../BillingRigDetailDashboardContext/useBillingDashboard";
import {formatCurrency} from "../../../../../app/utils/formatCurrency";

export const useDataGrid = () => {
  const {billing} = useBillingRigDetailDashboard();

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
  ];

  billing.forEach(({rigname}) => {
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

  const rigNames = Array.from(new Set(billing.map((item) => item.rigname)));

  const taxaNames = [
    "availablehouramount",
    "bobrentamount",
    "christmastreedisassemblyamount",
    "demobilizationamount",
    "dtmhouramount",
    "dtmbt20and50amount",
    "dtmgt50amount",
    "dtmlt20amount",
    "equipmentbt20and50amount",
    "equipmentgt50amount",
    "equipmentlt20amount",
    "extratraileramount",
    "fluidbt20and50amount",
    "fluidgt50amount",
    "fluidlt20amount",
    "generatorfuelamount",
    "glosshouramount",
    "mixtankdemobilizationamount",
    "mixtankdtmamount",
    "mixtankhourrentamount",
    "mixtankmobilizationamount",
    "mixtankmonthrentamount",
    "mixtankoperatoramount",
    "mobilizationamount",
    "munckamount",
    "powerswivelamount",
    "suckingtruckamount",
    "transportationamount",
    "truckcartrentamount",
    "truckkmamount",
    "trucktankamount",
  ];

  const taxaTranslation: Record<string, string> = {
    availablehouramount: "Horas Disponíveis",
    glosshouramount: "Horas Glosa",
    dtmhouramount: "Horas DTM",
    dtmlt20amount: "DTM < 20",
    dtmbt20and50amount: "DTM 20-50",
    dtmgt50amount: "DTM > 50",
    fluidlt20amount: "Taxa de Fluido < 20",
    fluidbt20and50amount: "Taxa de Fluido 20-50",
    fluidgt50amount: "Taxa de Fluido > 50",
    equipmentlt20amount: "Taxa de Equipamento < 20",
    equipmentbt20and50amount: "Taxa de Equipamento 20-50",
    equipmentgt50amount: "Taxa de Equipamento > 50",
    bobrentamount: "Locação BOP",
    christmastreedisassemblyamount: "Desmontagem de Árvode de Natal",
    demobilizationamount: "Desmobilização",
    extratraileramount: "Trailer Extra",
    generatorfuelamount: "Combustível Gerador",
    mixtankdemobilizationamount: "Desm. de Tanque Mix",
    mixtankdtmamount: "DTM Tanque Mix ",
    mixtankhourrentamount: "Loc. Tanque Mix em serviço",
    mixtankmobilizationamount: "Mob. de Tanque Mix",
    mixtankmonthrentamount: "Loc Tanque Mix Mensal",
    mixtankoperatoramount: "Operadores de Tanque Mix",
    mobilizationamount: "Mobilização",
    munckamount: "Loc. Munk",
    powerswivelamount: "Power Swivel",
    suckingtruckamount: "Caminhão Sugador",
    transportationamount: "Transporte",
    truckcartrentamount: "Locação Caminhão + Carreta",
    truckkmamount: "Km Caminhão",
    trucktankamount: "Locação Caminhão + Tanque",
  };

  // Criar a tabela com as taxas como linhas e sondas como colunas

  const tableData = taxaNames.map((taxa) => {
    const rowData: any = {
      id: `${taxa}-total`,
      taxa: taxaTranslation[taxa] || taxa,
    };
    rigNames.forEach((rigname) => {
      const rigData: any = billing.find((item) => item.rigname === rigname);
      rowData[rigname] = rigData ? rigData[taxa] : 0;
    });
    return rowData;
  });

  return {
    columns,
    data: tableData,
  };
};
