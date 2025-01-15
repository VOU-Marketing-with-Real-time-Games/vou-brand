import React, { useContext, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { columns as initialColumns } from "./campaignsColumnsConfig.tsx";
import { ICampaign } from "../../types/campaign.type.ts";
import campaignApi from "../../api/campaign.api";
import { useQuery } from "@tanstack/react-query";
import { getActionColumn } from "./ActionColumn";
import { Backdrop, Box, Modal } from "@mui/material";
import CampaignDetails from "../modals-content/CampaignDetails.tsx";
import { AuthContext } from "../../context/AuthContext.tsx";
import { Add } from "@mui/icons-material";
import Button from "@mui/material/Button";
import CreateCampaignStepper from "../modals-content/CreateCampaignStepper.tsx";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

export default function CampaignsDataGrid() {
  const { auth } = useContext(AuthContext)!;
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | number | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const handleOpen = (id: string | number) => {
    setSelectedCampaignId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const transformedRows = (campaigns: ICampaign[]): GridRowsProp => {
    return campaigns.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      image: campaign.image,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      status: campaign.status,
      brandId: campaign.brandId,
    }));
  };

  const { refetch } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const campaigns: ICampaign[] = await campaignApi.getCampaignsByBrandId(auth.brand.id);
      setRows(transformedRows(campaigns));
      return campaigns;
    },
  });

  function CustomToolbar({}: GridSlotProps["toolbar"]) {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbarFilterButton />
        <Box>
          <GridToolbarQuickFilter />
          <Button color="primary" startIcon={<Add />} sx={{ marginLeft: "20px" }} onClick={handleOpenForm}>
            New Campaign
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  const handleModalUpdateSuccess = () => {
    setOpen(false);
    refetch();
  };

  const handleFormSuccess = () => {
    setOpenForm(false);
    refetch().then();
  };

  const columns = [...initialColumns, getActionColumn({ handleOpen })];

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
        <CreateCampaignStepper onSuccess={handleFormSuccess} />
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
        {selectedCampaignId === null ? (
          <div></div>
        ) : (
          <CampaignDetails id={selectedCampaignId} onSuccess={handleModalUpdateSuccess} />
        )}
      </Modal>
      <DataGrid
        rowHeight={120}
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
