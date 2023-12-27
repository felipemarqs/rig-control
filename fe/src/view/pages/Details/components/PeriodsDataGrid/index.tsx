import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

import {NotFound} from "../../../../components/NotFound";
import {translateType} from "../../../../../app/utils/translateType";
import {EfficienciesResponse} from "../../../../../app/services/efficienciesService/getById";
import {formatIsoStringToHours} from "../../../../../app/utils/formatIsoStringToHours";
import {translateClassification} from "../../../../../app/utils/translateClassification";
import {Button} from "../../../../components/Button";

interface ListPeriodsDataGridProps {
  data: EfficienciesResponse;
  openDetailModal(description: string): void;
}

export const PeriodsDataGrid = ({
  data,
  openDetailModal,
}: ListPeriodsDataGridProps) => {
  const columns: GridColDef[] = [
    {
      field: "startHour",
      headerName: "Hora Inicial",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold bg-primary-500 py-1 px-6 rounded-sm">
              {formatIsoStringToHours(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "endHour",
      headerName: "Hora Final",
      flex: 0.6,
      headerAlign: "center",
      align: "center",

      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white  font-semibold bg-primary-500 py-1 px-6 rounded-sm">
              {formatIsoStringToHours(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white  bg-primary-500 py-1 px-4 rounded-sm">
              {translateType(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "classification",
      headerName: "Classificação",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white  bg-primary-500 py-1 px-4 rounded-sm">
              {translateClassification(params.value)}
            </div>
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <Button
              className="bg-secondary-500 rounded-md h-[25px]"
              onClick={() => openDetailModal(params.value)}
            >
              Ver Detalhes
            </Button>
          </div>
        );
      },
    },
  ];

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
      rows={data.periods}
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
