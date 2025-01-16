import { Box, Button, Grid, TextField, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import voucherApi from "../../../api/voucher.api";
import toast from "react-hot-toast";

const VoucherForm = ({
  onNext,
  onBack,
  campaignId,
}: {
  onNext: () => void;
  onBack: () => void;
  campaignId: number | null;
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not defined");
  }
  const { auth } = authContext;

  const [voucherData, setVoucherData] = useState<{
    code: string;
    image: string;
    description: string;
    discount: number;
    expiredDate: Date | null;
    brandId: number;
    campaignId: number | null;
    total: number;
  }>({
    code: "",
    image: "",
    description: "",
    discount: 0,
    expiredDate: null,
    brandId: auth.brand.id,
    campaignId: campaignId,
    total: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "discount" || name === "total") {
      const numericValue = Math.max(0, Number(value));
      setVoucherData({ ...voucherData, [name]: numericValue });
    } else {
      setVoucherData({ ...voucherData, [name]: value });
    }
  };

  const handleDateChange = (date: Date | null) => {
    setVoucherData({ ...voucherData, expiredDate: date });
  };

  const validateData = () => {
    if (!voucherData.code) {
      toast.error("Code is required");
      return false;
    }
    if (!voucherData.image) {
      toast.error("Image is required");
      return false;
    }
    if (!voucherData.description) {
      toast.error("Description is required");
      return false;
    }
    if (!voucherData.discount) {
      toast.error("Discount is required");
      return false;
    }
    if (!voucherData.expiredDate) {
      toast.error("Expiration Date is required");
      return false;
    }
    if (!voucherData.total) {
      toast.error("Total is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) {
      return;
    }
    try {
      await voucherApi.createVoucher({
        ...voucherData,
        campaignId: voucherData.campaignId ?? 0, // Ensure campaignId is a number
        expiredDate: voucherData.expiredDate,
      });
      toast.success("Voucher created successfully");
      onNext();
    } catch (error) {
      toast.error("Failed to create voucher");
      console.error("Failed to create voucher", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="code"
              label="Code"
              value={voucherData.code}
              onChange={handleChange}
              fullWidth
              placeholder="MAGIAMGIA, SIEUSALE, ..."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="image" label="Image" value={voucherData.image} onChange={handleChange} fullWidth />
          </Grid>
          {voucherData.image && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={voucherData.image} alt="Voucher" style={{ maxWidth: "100%", maxHeight: "200px" }} />
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              value={voucherData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="discount"
              label="Discount"
              value={voucherData.discount}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Expiration Date"
              value={voucherData.expiredDate}
              onChange={handleDateChange}
              renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="total" label="Total" value={voucherData.total} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={onBack} variant="contained" color="secondary">
              Back
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default VoucherForm;