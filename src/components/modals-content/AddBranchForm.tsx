import { forwardRef, useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import branchApi from "../../api/branch.api";
import { IBranchRequestDto } from "../../types/branch.type";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext.tsx";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

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

interface AddBranchFormProps {
  onSuccess: () => void;
}

// eslint-disable-next-line react/prop-types
const SearchField = ({ setValue }) => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  function searchEventHandler(result) {
    const { lat, lon } = result.location.raw;
    setValue("latitude", lat);
    setValue("longitude", lon);
  }

  // @ts-ignore
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
  // @ts-expect-error
  useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/showlocation", searchEventHandler);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

const AddBranchForm = forwardRef<HTMLDivElement, AddBranchFormProps>(({ onSuccess }, ref) => {
  const { auth } = useContext(AuthContext)!;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBranchRequestDto>({
    defaultValues: {
      brandId: auth.brand.id,
      name: "",
      address: "",
      longitude: 0,
      latitude: 0,
    },
  });

  const createBranchMutation = useMutation({
    mutationFn: (data: IBranchRequestDto) => branchApi.createBranch(data),
    onError: (error: any) => {
      console.log(error);
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Branch created successfully");
      onSuccess();
    },
  });

  const onSubmit: SubmitHandler<IBranchRequestDto> = (data) => {
    createBranchMutation.mutate(data);
  };

  return (
    <Card ref={ref} variant="outlined">
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        CREATE NEW BRANCH
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl sx={{ display: "none" }}>
          <FormLabel htmlFor="brandId">Brand ID</FormLabel>
          <Controller
            name="brandId"
            control={control}
            rules={{ required: "Brand ID is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="brandId"
                placeholder="1"
                error={!!errors.brandId}
                helperText={errors.brandId ? (errors.brandId.message as string) : ""}
                color={errors.brandId ? "error" : "primary"}
                disabled
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="name"
                placeholder="Branch Name"
                error={!!errors.name}
                helperText={errors.name ? (errors.name.message as string) : ""}
                color={errors.name ? "error" : "primary"}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required." }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="address"
                placeholder="Branch Address"
                error={!!errors.address}
                helperText={errors.address ? (errors.address.message as string) : ""}
                color={errors.address ? "error" : "primary"}
              />
            )}
          />
        </FormControl>
        <MapContainer center={[10.762622, 106.660172]} zoom={10} style={{ height: "300px", width: "100%" }}>
          <SearchField setValue={setValue} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <Button type="submit" fullWidth variant="contained">
          Create
        </Button>
      </Box>
    </Card>
  );
});

AddBranchForm.displayName = "AddBranchForm";

export default AddBranchForm;
