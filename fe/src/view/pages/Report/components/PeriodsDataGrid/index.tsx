import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

import {NotFound} from "../../../../components/NotFound";
import {translateType} from "../../../../../app/utils/translateType";
import {translateClassification} from "../../../../../app/utils/translateClassification";
import {Period} from "../../../../../app/entities/Period";
import {formatDate} from "../../../../../app/utils/formatDate";
import {localeTextDataGridConfig} from "../../../../../app/utils/localeTextDataGridConfig";
import {GetByPeriodTypeFilters} from "../../../../../app/services/periodsService/getByPeriodType";
import {translateRepairClassification} from "../../../../../app/utils/translateRepairClassification";

interface ListPeriodsDataGridProps {
  periods: Array<Period>;
  totalItems: number;
  filters: GetByPeriodTypeFilters;
  isLoading: boolean;
  onPaginationModelChange(model: GridPaginationModel): void;
}

export const PeriodsDataGrid = ({
  periods,
  totalItems,
  filters,
  onPaginationModelChange,
  isLoading,
}: ListPeriodsDataGridProps) => {
  const columns: GridColDef[] = [
    {
      field: "startHour",
      headerName: "Data",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white font-semibold bg-primary-500 py-1 px-6 rounded-sm">
              {formatDate(new Date(params.value))}
            </div>
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "Tipo",
      width: 150,
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
      flex: 0.2,
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
          <div className="w-full text-white flex justify-center">
            {params.value}
          </div>
        );
      },
    },
  ];

  if (filters.periodType === "REPAIR") {
    columns.splice(3, 0, {
      field: "repairClassification",
      headerName: "Reparo",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      renderCell(params: GridRenderCellParams) {
        return (
          <div className="w-full flex justify-center items-center">
            <div className="text-white  bg-primary-500 py-1 px-4 rounded-sm">
              {translateRepairClassification(params.value)}
            </div>
          </div>
        );
      },
    });
  }

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
      loading={isLoading}
      rows={periods}
      disableVirtualization
      paginationModel={{
        page: Number(filters.pageIndex) - 1,
        pageSize: Number(filters.pageSize),
      }}
      onPaginationModelChange={(model) => onPaginationModelChange(model)}
      getRowHeight={() => "auto"}
      getEstimatedRowHeight={() => 200}
      localeText={localeTextDataGridConfig}
      paginationMode="server"
      rowCount={totalItems}
      pageSizeOptions={[5, 10, 25, 100]}
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
        "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {py: "8px"},
        "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {py: "15px"},
        "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
          py: "22px",
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
