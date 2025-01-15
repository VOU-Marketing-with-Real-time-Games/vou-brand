import { GridColDef } from "@mui/x-data-grid";
import BranchMap from "../modals-content/BranchMap.tsx";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    width: 50,
    filterable: false,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    width: 50,
    filterable: false,
  },
  {
    field: "map",
    headerName: "Map",
    headerAlign: "center",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => <BranchMap branch={params.row} />,
  },
];
