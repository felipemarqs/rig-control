import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {Button} from "../Button";
import {Link} from "react-router-dom";
import {formatDate} from "../../../app/utils/formatDate";
import {Efficiency} from "../../pages/Dashboard/entities/Efficiency";
import {NotFound} from "../NotFound";

interface ListDataGridProps {
  data: Efficiency[];
  isDashboard: boolean;
}

export const ListEfficienciesDataGrid = ({
  data,
  isDashboard,
}: ListDataGridProps) => {
  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "Usuário",
      headerAlign: "center",
      flex: 0.5,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold bg-primary-500 py-2 px-6 rounded-md">
              {params.value.name}
            </div>
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Data",
      headerAlign: "center",
      type: "date",
      flex: 0.5,
      valueGetter: (params: GridValueGetterParams) => {
        // Supondo que o valor de data seja uma string no formato ISO8601
        return new Date(params.value);
      },
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold bg-primary-500 py-2 px-6 rounded-md">
              {" "}
              {formatDate(new Date(params.value))}
            </div>
          </div>
        );
      },
    },
    {
      field: "well",
      headerName: "Poço",
      headerAlign: "center",
      flex: 0.5,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold bg-primary-500 py-2 px-6 rounded-md">
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "availableHours",
      headerName: "Horas Disponíveis",
      headerAlign: "center",
      flex: 0.5,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold bg-primary-500 py-2 px-6 rounded-md">
              {params.value}Hrs
            </div>
          </div>
        );
      },
    },
    {
      field: "id",
      headerAlign: "center",
      headerName: "Ver Detalhes",
      flex: 0.5,
      filterable: false,
      sortable: false,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <Link to={`/details/${params.value}`} className="w-[35%] ">
              <Button className="bg-secondary-500 rounded-md h-[25px]">
                Ver Mais
              </Button>
            </Link>
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
      rows={data}
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
        toolbar: isDashboard ? undefined : GridToolbar,
        noRowsOverlay: NotFoundDataGrid,
      }}
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
