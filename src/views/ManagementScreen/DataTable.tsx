import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataTableProps } from "./types";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaderTitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
}));

const DataTable = ({
  columns,
  rows,
  rowCount,
  paginationOptions = [5],
  paginationModel,
  onPaginationModelChange,
  loading,
}: DataTableProps) => {
  return (
    <StyledDataGrid
      autoHeight
      columns={columns}
      rows={rows}
      rowCount={rowCount}
      pageSizeOptions={paginationOptions}
      paginationModel={paginationModel}
      loading={loading}
      onPaginationModelChange={onPaginationModelChange}
      paginationMode="server"
    />
  );
};

export default DataTable;
