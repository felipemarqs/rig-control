import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {NotFound} from "../../../../../../components/NotFound";
import {translateType} from "../../../../../../../app/utils/translateType";
import {EfficienciesResponse} from "../../../../../../../app/services/efficienciesService/getById";
import {formatIsoStringToHours} from "../../../../../../../app/utils/formatIsoStringToHours";
import {translateClassification} from "../../../../../../../app/utils/translateClassification";
import {Button} from "@/components/ui/button";

interface ListPeriodsDataGridProps {
  data: EfficienciesResponse;
  openDetailModal(description: string): void;
  windowWidth?: number;
}

export const PeriodsDataGrid = ({
  data,
  windowWidth = 1920,
  openDetailModal,
}: ListPeriodsDataGridProps) => {
  const columns: GridColDef[] =
    windowWidth >= 768
      ? [
          {
            field: "startHour",
            headerName: "Hora Inicial",
            flex: 0.2,
            headerAlign: "center",
            align: "center",
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {formatIsoStringToHours(params.value)}
                  </div>
                </div>
              );
            },
          },
          {
            field: "endHour",
            headerName: "Hora Final",
            flex: 0.2,
            headerAlign: "center",
            align: "center",

            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {formatIsoStringToHours(params.value)}
                  </div>
                </div>
              );
            },
          },
          {
            field: "type",
            headerName: "Tipo",
            flex: 0.3,
            headerAlign: "center",
            align: "center",
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {translateType(params.value)}
                  </div>
                </div>
              );
            },
          },
          {
            field: "classification",
            headerName: "Classificação",
            flex: 0.3,
            headerAlign: "center",
            align: "center",
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
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
                <div className="w-full flex justify-center items-center py-5">
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {params.value}
                  </div>
                </div>
              );
            },
          },
        ]
      : [
          {
            field: "startHour",
            headerName: "Hora Inicial",
            flex: 0.2,
            headerAlign: "center",
            align: "center",
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {formatIsoStringToHours(params.value)}
                  </div>
                </div>
              );
            },
          },
          {
            field: "endHour",
            headerName: "Hora Final",
            flex: 0.2,
            headerAlign: "center",
            align: "center",

            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {formatIsoStringToHours(params.value)}
                  </div>
                </div>
              );
            },
          },
          {
            field: "type",
            headerName: "Tipo",
            flex: 0.3,
            headerAlign: "center",
            align: "center",
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {translateType(params.value)}
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
                <div className="w-full flex justify-center items-center py-2">
                  <Button
                    size="sm"
                    className="rounded-md h-[25px]"
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
      getRowHeight={() => "auto"}
      getEstimatedRowHeight={() => 200}
      columns={columns}
      slots={{
        //toolbar: GridToolbar,
        noRowsOverlay: NotFoundDataGrid,
      }}
      //getRowId={(row) => row.rigid}
      className="border-none"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none !important",
        },
        "& .MuiDataGrid-cell": {
          color: "hsl(var(--muted-foreground))",
        },
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: 400,
          color: "hsl(var(--muted-foreground))",
          borderRadius: "var(--none, 0px)",
          borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderLeft:
            "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderRight:
            "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          borderTop:
            "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
          //background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
          alignItems: "space-between !important",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .MuiTablePagination-root": {
          color: "hsl(var(--muted-foreground))",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "hsl(var(--card))",
          padding: 0,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "hsl(var(--card))",
          color: "hsl(var(--muted-foreground))",
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: "hsl(var(--muted-foreground)) !important",
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
          color: "hsl(var(--muted-foreground)) !important",
        },
        "& .MuiDataGrid-withBorderColor": {
          border: "none",
        },
      }}
    />
  );
};
