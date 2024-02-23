import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {Efficiency} from "../../entities/Efficiency";
import {formatDate} from "../../../../../app/utils/formatDate";
import {Link} from "react-router-dom";
import {Button} from "../../../../components/Button";
import {NotFound} from "../../../../components/NotFound";

interface ListDataGridProps {
  data: Efficiency[];
  isDashboard: boolean;
}

export const ListEquipmentRepairs = ({
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
            <div className="text-primary-500 font-semibold">
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
      flex: 0.2,
      valueGetter: (params: GridValueGetterParams) => {
        // Supondo que o valor de data seja uma string no formato ISO8601
        return new Date(params.value);
      },
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-primary-500 font-semibold">
              {" "}
              {formatDate(new Date(params.value)).slice(0, 5)}
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
            <div className="text-primary-500 font-semibold">{params.value}</div>
          </div>
        );
      },
    },
    {
      field: "availableHours",
      headerName: "Hrs Disp.",
      headerAlign: "center",
      flex: 0.2,
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-primary-500 font-semibold ">
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
            <Link
              to={`/details/${params.value}`}
              className="w-full flex justify-center items-center"
            >
              <Button className="bg-primary-500 rounded-md h-[25px]">
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
        <span className="text-primary-500">
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
          borderBottomColor: "#1c7b7b",
          borderWidth: "1px",
        },
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: "bold",
          backgroundColor: "#1c7b7b",
          color: "#fff",
          // borderBottom: "#1c7b7b",
          borderBottomColor: "#1c7b7b",
          borderWidth: "1px",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .MuiTablePagination-root": {
          color: "#1c7b7b",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#E9ECEF",
          padding: 0,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "#E9ECEF",
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
