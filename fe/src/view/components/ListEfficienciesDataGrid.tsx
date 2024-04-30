import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {formatDate} from "../../app/utils/formatDate";
import {Efficiency} from "../pages/Dashboard/entities/Efficiency";
import {NotFound} from "./NotFound";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";

interface ListDataGridProps {
  data: Efficiency[];
  isDashboard: boolean;
  windowWidth?: number;
  limitPagination?: boolean;
}

export const ListEfficienciesDataGrid = ({
  data,
  isDashboard,
  windowWidth = 1920,
  limitPagination = true,
}: ListDataGridProps) => {
  const columns: GridColDef[] =
    windowWidth >= 768
      ? [
          {
            field: "user",
            headerName: "Usuário",
            headerAlign: "center",
            flex: 0.3,
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter">
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
                  <div className="text-gray-800 font-medium tracking-tighter">
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
            field: "availableHours",
            headerName: "Hrs Disp.",
            headerAlign: "center",
            flex: 0.2,
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <div className="text-gray-800 font-medium tracking-tighter ">
                    {params.value}Hrs
                  </div>
                </div>
              );
            },
          },
          {
            field: "id",
            headerAlign: "center",
            headerName: "Açoes",

            filterable: false,
            sortable: false,
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        {" "}
                        <Link
                          to={`/details/${params.value}`}
                          className="w-full flex justify-center items-center"
                        >
                          <Button variant="ghost">Ver Mais</Button>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            },
          },
        ]
      : [
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
                  <div className="text-gray-800 font-medium tracking-tighter">
                    {" "}
                    {formatDate(new Date(params.value)).slice(0, 5)}
                  </div>
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
                  <div className="text-gray-800 font-medium tracking-tighter ">
                    {params.value}Hrs
                  </div>
                </div>
              );
            },
          },
          {
            field: "id",
            headerAlign: "center",
            headerName: "Açoes",

            filterable: false,
            sortable: false,
            renderCell(params: GridRenderCellParams) {
              return (
                <div className="w-full flex justify-center items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        {" "}
                        <Link
                          to={`/details/${params.value}`}
                          className="w-full flex justify-center items-center"
                        >
                          <Button variant="ghost">Ver Mais</Button>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            },
          },
        ];

  const NotFoundDataGrid = () => {
    return (
      <NotFound>
        <span className="text-gray-800">
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
      pagination
      pageSizeOptions={isDashboard ? [5] : [5, 10, 25, 100]}
      paginationMode="client"
      initialState={
        limitPagination
          ? {
              pagination: {
                paginationModel: {pageSize: 5, page: 0},
              },
            }
          : undefined
      }
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
