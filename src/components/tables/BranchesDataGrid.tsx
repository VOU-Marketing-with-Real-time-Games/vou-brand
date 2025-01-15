import { useContext, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { AuthContext } from "../../context/AuthContext.tsx";
import branchApi from "../../api/branch.api";
import { useQuery } from "@tanstack/react-query";
import { IBranch } from "../../types/branch.type.ts";
import { columns as initialColumns } from "./branchesColumnsConfig.tsx";
import { getActionColumn } from "./ActionColumn.tsx";
import { Backdrop, Box, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import AddBranchForm from "../modals-content/AddBranchForm.tsx";
import EditBranchForm from "../modals-content/EditBranchForm.tsx";

export default function BranchesDataGrid() {
  const { auth } = useContext(AuthContext)!;
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | number | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const handleOpen = (id: string | number) => {
    setSelectedBranchId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const transformedRows = (branches: IBranch[]): GridRowsProp => {
    return branches.map((branch) => ({
      id: branch.id,
      name: branch.name,
      address: branch.address,
      longitude: branch.longitude,
      latitude: branch.latitude,
    }));
  };

  const { refetch } = useQuery({
    queryKey: ["branches", auth.brand.id],
    queryFn: async () => {
      const branches = await branchApi.getBranchesByBrandId(auth.brand.id);
      setRows(transformedRows(branches));
      return branches;
    },
  });

  function CustomToolbar({}: GridSlotProps["toolbar"]) {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbarFilterButton />
        <Box>
          <GridToolbarQuickFilter />
          <Button color="primary" startIcon={<Add />} sx={{ marginLeft: "20px" }} onClick={handleOpenForm}>
            New Branch
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  const columns = [
    ...initialColumns,
    getActionColumn({
      handleOpen: (id: string | number) => handleOpen(id),
    }),
  ];

  const handleFormSuccess = () => {
    setOpenForm(false);
    refetch().then();
  };

  return (
    <>
      <Modal
        tabIndex={-1}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openForm}
        onClose={handleCloseForm}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <AddBranchForm onSuccess={handleFormSuccess} />
      </Modal>
      <Modal
        tabIndex={-1}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        {selectedBranchId === null ? (
          <div></div>
        ) : (
          <EditBranchForm branchId={selectedBranchId} onSuccess={handleFormSuccess} />
        )}
      </Modal>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        disableColumnMenu
        density="compact"
        getRowHeight={() => 200}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small",
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                  sx: { mt: "auto" },
                },
              },
            },
          },
        }}
      />
    </>
  );
}
