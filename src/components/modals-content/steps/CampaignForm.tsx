import { Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useState, useContext } from "react";
import { TextFieldProps } from "@mui/material/TextField";
import { AuthContext } from "../../../context/AuthContext";
import campaignApi from "../../../api/campaign.api";
import toast from "react-hot-toast";

const CampaignForm = ({ onNext }: { onNext: (id: number) => void }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not defined");
  }
  const { auth } = authContext;

  const [campaignData, setCampaignData] = useState<{
    name: string;
    image: string;
    field: string;
    startDate: Date | null;
    endDate: Date | null;
    brandId: number;
  }>({
    name: "",
    image: "",
    field: "",
    startDate: null,
    endDate: null,
    brandId: auth.brand.id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setCampaignData({ ...campaignData, [name]: date });
  };

  const validateData = () => {
    if (!campaignData.name) {
      toast.error("Name is required");
      return false;
    }
    if (!campaignData.image) {
      toast.error("Image is required");
      return false;
    }
    if (!campaignData.field) {
      toast.error("Field is required");
      return false;
    }
    if (!campaignData.startDate) {
      toast.error("Start Date is required");
      return false;
    }
    if (!campaignData.endDate) {
      toast.error("End Date is required");
      return false;
    }
    if (campaignData.startDate >= campaignData.endDate) {
      toast.error("Start Date must be before End Date");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // if (!validateData()) {
    //   return;
    // }
    try {
      // const response = await campaignApi.createCampaign({
      //   ...campaignData,
      //   startDate: campaignData.startDate?.toISOString() || "",
      //   endDate: campaignData.endDate?.toISOString() || "",
      // });
      // onNext(response.id);
      onNext(1);
    } catch (error) {
      toast.error("Failed to create campaign");
      console.error("Failed to create campaign", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="name" label="Name" value={campaignData.name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="image" label="Image" value={campaignData.image} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="field" label="Field" value={campaignData.field} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={campaignData.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
              renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={campaignData.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
              renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CampaignForm;
