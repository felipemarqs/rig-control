import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

import {NotFound} from "../../../../components/NotFound";

import {formatCurrency} from "../../../../../app/utils/formatCurrency";
import {BillingResponse} from "../../../../../app/services/billingServices/getAll";

interface ListBillingDataGridProps {
  data: BillingResponse[];
}

export const ListBillingDataGrid = ({data}: ListBillingDataGridProps) => {
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

  data.forEach(({rigname}) => {
    columns.push({
      field: rigname,
      headerName: rigname,
      flex: 0.6,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white  bg-primary py-1 px-6 rounded-sm">
              {formatCurrency(params.value)}
            </div>
          </div>
        );
      },
    });
  });

  const rigNames = Array.from(new Set(data.map((item) => item.rigname)));

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
      const rigData: any = data.find((item) => item.rigname === rigname);
      rowData[rigname] = rigData ? rigData[taxa] : 0;
    });
    return rowData;
  });

  const NotFoundDataGrid = () => {
    return (
      <NotFound>
        <span className="text-white">
          <strong>Não</strong> existem dados para a <strong>sonda</strong> no{" "}
          <strong>período</strong> selecionado!
        </span>
      </NotFound>
    );
  };

  return (
    <DataGrid
      rows={tableData}
      localeText={{
        toolbarFilters: "Filtros",
        toolbarFiltersLabel: "Show filters",
        toolbarDensity: "Densidade",
        toolbarDensityLabel: "Size",
        toolbarDensityCompact: "Compacto",
        toolbarDensityStandard: "Padrão",
        toolbarDensityComfortable: "Confortável",
        headerFilterOperatorContains: "Contém",
        headerFilterOperatorEquals: "Igual a",
        headerFilterOperatorStartsWith: "Começa com",
        headerFilterOperatorEndsWith: "Termina com",
        headerFilterOperatorIs: "É",
        headerFilterOperatorNot: "Não é",
        headerFilterOperatorAfter: "É depois",
        headerFilterOperatorOnOrAfter: "É ou é depois",
        headerFilterOperatorBefore: "É antes",
        headerFilterOperatorOnOrBefore: "É ou é antes",
        headerFilterOperatorIsEmpty: "É vazio",
        headerFilterOperatorIsNotEmpty: "Não é vazio",
        headerFilterOperatorIsAnyOf: "É qualquer um",
        "headerFilterOperator=": "Igual",
        "headerFilterOperator!=": "Diferente",
        "headerFilterOperator>": "Maior que",
        "headerFilterOperator>=": "Maior ou igual a",
        "headerFilterOperator<": "Menor que",
        "headerFilterOperator<=": "Menor ou igual a",

        filterPanelAddFilter: "Add filter",
        filterPanelRemoveAll: "Remove all",
        filterPanelDeleteIconLabel: "Delete",
        filterPanelLogicOperator: "Logic operator",
        filterPanelOperator: "Operador",
        filterPanelOperatorAnd: "And",
        filterPanelOperatorOr: "Or",
        filterPanelColumns: "Colunas",
        filterPanelInputLabel: "Valor",
        filterPanelInputPlaceholder: "Valor de filtro",

        filterOperatorContains: "contém",
        filterOperatorEquals: "igual",
        filterOperatorStartsWith: "começa com",
        filterOperatorEndsWith: "termina com",
        filterOperatorIs: "É",
        filterOperatorNot: "Não é",
        filterOperatorAfter: "É depois",
        filterOperatorOnOrAfter: "É depois ou antes",
        filterOperatorBefore: "É antes",
        filterOperatorOnOrBefore: "É ou é antes",
        filterOperatorIsEmpty: "É vazio",
        filterOperatorIsNotEmpty: "Não é vazio",
        filterOperatorIsAnyOf: "É qualquer um",
        "filterOperator=": "=",
        "filterOperator!=": "!=",
        "filterOperator>": ">",
        "filterOperator>=": ">=",
        "filterOperator<": "<",
        "filterOperator<=": "<=",
      }}
      columns={columns}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: NotFoundDataGrid,
      }}
      //getRowId={(row) => row.rigid}
      className="border-none"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          borderRightColor: "black",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#1c7b7b",
          color: "#fff",
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#499595",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "#1c7b7b",
          color: "#fff",
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: "#1c7b7b !important",
        },
      }}
    />
  );
};
