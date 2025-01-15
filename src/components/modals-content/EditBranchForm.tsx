import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import branchApi from "../../api/branch.api";
import { IBranch, IBranchRequestDto } from "../../types/branch.type";
import toast from "react-hot-toast";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const Card = styled(MuiCard)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "30%",
  height: "fit-content",
  maxHeight: "98%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("md")]: {
    minWidth: "40%",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface EditBranchFormProps {
  branchId: number | string;
  onSuccess: () => void;
}

const SearchField = ({ setValue }) => {
  const provider = new OpenStreetMapProvider();

  function searchEventHandler(result) {
    const { lat, lon } = result.location.raw;
    setValue("latitude", lat);
    setValue("longitude", lon);
  }

  const searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: true,
    showPopup: false,
    marker: {
      draggable: true,
    },
    maxMarkers: 1,
    retainZoomLevel: false,
    searchLabel: "Enter address",
    updateMap: true,
    keepResult: true,
    style: "bar",
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/showlocation", searchEventHandler);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

const EditBranchForm = ({ branchId, onSuccess }: EditBranchFormProps) => {
  const [branch, setBranch] = useState<IBranch>({
    id: 0,
    brandId: 0,
    name: "",
    address: "",
    longitude: 0,
    latitude: 0,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { data } = useQuery({
    queryKey: ["branch", branchId],
    queryFn: async () => {
      const branchData = await branchApi.getBranchById(branchId);
      setBranch(branchData);
      return branchData;
    },
  });

  const updateBranchMutation = useMutation({
    mutationFn: (data: IBranchRequestDto) => branchApi.updateBranch(branchId, data),
    onError: (error: any) => {
      console.log(error);
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Branch updated successfully");
      onSuccess();
      setIsEditMode(false);
    },
  });

  const deleteBranchMutation = useMutation({
    mutationFn: () => branchApi.deleteBranch(branchId),
    onError: (error: any) => {
      console.log(error);
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Branch deleted successfully");
      onSuccess();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBranch((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (isEditMode) {
      updateBranchMutation.mutate(branch);
    } else {
      setIsEditMode(true);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteBranchMutation.mutate();
    setOpenConfirmDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        {isEditMode ? "EDIT BRANCH" : "VIEW BRANCH"}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={branch.name}
          onChange={handleInputChange}
          disabled={!isEditMode}
        />
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={branch.address}
          onChange={handleInputChange}
          disabled={!isEditMode}
        />
        {!isEditMode && branch.latitude !== 0 && branch.longitude !== 0 ? (
          <MapContainer
            center={[branch.latitude, branch.longitude]}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[branch.latitude, branch.longitude]}>
              <Popup>
                <strong>{branch.name}</strong>
                <br />
                {branch.address}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <MapContainer
            center={[branch.latitude, branch.longitude]}
            zoom={16}
            style={{ height: "300px", width: "100%" }}
          >
            <SearchField setValue={(name, value) => setBranch((prev) => ({ ...prev, [name]: value }))} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          {isEditMode ? (
            <>
              <Button variant="contained" color="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="contained" color="warning" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this branch?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="warning" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EditBranchForm;