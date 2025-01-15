import { GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";

interface ActionColumnProps {
  handleOpen?: (id: string | number) => void;
}

export const getActionColumn = ({ handleOpen }: ActionColumnProps): GridColDef => ({
  field: "action",
  headerName: "Action",
  sortable: false,
  width: 100,
  cellClassName: "actions",
  align: "center",
  headerAlign: "center",
  filterable: false,
  getApplyQuickFilterFn: undefined,
  renderCell: (params) => {
    const id = params.id as GridRowId;
    return (
      <>
        {handleOpen && (
          <GridActionsCellItem
            key="watch"
            icon={<Visibility />}
            label="Watch"
            onClick={() => {
              handleOpen(id);
            }}
          />
        )}
      </>
    );
  },
});
