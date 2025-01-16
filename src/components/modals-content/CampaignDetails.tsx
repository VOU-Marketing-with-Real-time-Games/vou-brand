import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import { forwardRef, useState } from "react";
import Typography from "@mui/material/Typography";
import { useQuery, useMutation } from "@tanstack/react-query";
import campaignApi from "../../api/campaign.api";
import { ICampaign } from "../../types/campaign.type";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { format } from "date-fns";

const Card = styled(MuiCard)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "60%",
  height: "fit-content",
  maxHeight: "98%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "fit-content",
    maxWidth: "80%",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface CampaignDetailsProps {
  id: string | number;
  onSuccess: () => void;
}

const renderStatus = (status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED" | "CANCELED") => {
  const colors: { [index: string]: "primary" | "success" | "default" | "error" | "warning" } = {
    PENDING: "primary",
    APPROVED: "success",
    REJECTED: "error",
    ACTIVE: "success",
    COMPLETED: "default",
    CANCELED: "warning",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
};

const renderDate = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy");
};

const CampaignDetails = forwardRef<HTMLDivElement, CampaignDetailsProps>(({ id, onSuccess }, ref) => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);

  useQuery({
    queryKey: ["get-campaign", id],
    queryFn: async () => {
      try {
        const fetchedCampaign = await campaignApi.getCampaignById(Number(id));
        setCampaign(fetchedCampaign);
        return fetchedCampaign;
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch campaign data");
      }
    },
  });

  const updateCampaignStatus = useMutation({
    mutationFn: (status: string) => campaignApi.updateCampaign(Number(id), { ...campaign, status } as ICampaign),
    onSuccess: () => {
      toast.success("Campaign status updated successfully");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update campaign status");
    },
  });

  const handleCancel = () => {
    setIsCanceling(true);
  };

  const handleConfirmCancel = () => {
    updateCampaignStatus.mutate("CANCELED");
  };

  const handleCancelCancel = () => {
    setIsCanceling(false);
  };

  return (
    <Card ref={ref}>
      <Typography component="h1" variant="h5" sx={{ width: "100%", fontSize: "1.5rem", textAlign: "center" }}>
        Campaign Details
      </Typography>
      {campaign ? (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: "1 1 40%" }}>
            <img src={campaign.image} alt={campaign.name} style={{ width: "100%", height: "auto" }} />
          </Box>
          <Box sx={{ flex: "1 1 60%" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Campaign ID</TableCell>
                    <TableCell>{campaign.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Name</TableCell>
                    <TableCell>{campaign.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Description</TableCell>
                    <TableCell>{campaign.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Start Date</TableCell>
                    <TableCell>{renderDate(campaign.startDate)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "primary" }}>End Date</TableCell>
                    <TableCell>{renderDate(campaign.endDate)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Status</TableCell>
                    <TableCell>{renderStatus(campaign.status as any)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {campaign.status !== "CANCELED" && campaign.status !== "REJECTED" && campaign.status !== "COMPLETED" && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
                {isCanceling ? (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ fontWeight: "bold", color: "whitesmoke" }}
                      onClick={handleCancelCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ fontWeight: "bold", color: "whitesmoke" }}
                      onClick={handleConfirmCancel}
                    >
                      Confirm
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ fontWeight: "bold", color: "whitesmoke" }}
                    onClick={handleCancel}
                  >
                    Cancel Campaign
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Typography component="p" variant="body1" sx={{ width: "100%", textAlign: "center" }}>
          Loading...
        </Typography>
      )}
    </Card>
  );
});

CampaignDetails.displayName = "CampaignDetails";
export default CampaignDetails;