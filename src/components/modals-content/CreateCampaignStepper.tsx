import { forwardRef, Fragment, useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import CampaignForm from "./steps/CampaignForm";
import VoucherForm from "./steps/VoucherForm";
import GameCampaignForm from "./steps/GameCampaignForm";
import QuizzForm from "./steps/QuizzForm";
import ShakeForm from "./steps/ShakeForm";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import gameCampaignApi from "../../api/gameCampaign.api";
import toast from "react-hot-toast";

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
  [theme.breakpoints.up("md")]: {
    minWidth: "60%",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));
const steps = ["Campaign", "Voucher", "GameCampaign", "Game"];

const CreateCampaignStepper = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeStep, setActiveStep] = useState(0);
  const [campaignId, setCampaignId] = useState<number | null>(null);
  const [gameCampaignId, setGameCampaignId] = useState<number | null>(null);
  const [gameType, setGameType] = useState<"QUIZZ" | "SHAKE" | null>(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCampaignId(null);
    setGameCampaignId(null);
    setGameType(null);
  };

  const handleCampaignCreated = (id: number) => {
    setCampaignId(id);
    handleNext();
  };

  const handleVoucherCreated = () => {
    handleNext();
  };

  const handleGameCampaignCreated = async (gameInfoId: number, type: "QUIZZ" | "SHAKE") => {
    try {
      const response = await gameCampaignApi.createGameCampaign({
        campaignId: campaignId ?? 0,
        gameInfoId,
        gameId: 0,
      });
      setGameCampaignId(response.id);
      setGameType(type);
      handleNext();
    } catch (error) {
      toast.error("Failed to create game campaign");
      console.error("Failed to create game campaign", error);
    }
  };

  return (
    <Card ref={ref} variant="outlined">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            {activeStep === 0 && <CampaignForm onNext={handleCampaignCreated} />}
            {activeStep === 1 && (
              <VoucherForm onNext={handleVoucherCreated} onBack={handleBack} campaignId={campaignId} />
            )}
            {activeStep === 2 && !gameType && (
              <GameCampaignForm onNext={handleGameCampaignCreated} onBack={handleBack} />
            )}
            {activeStep === 3 && gameType === "QUIZZ" && (
              <QuizzForm onNext={handleNext} onBack={handleBack} gameCampaignId={gameCampaignId} />
            )}
            {activeStep === 3 && gameType === "SHAKE" && (
              <ShakeForm onNext={handleNext} onBack={handleBack} gameCampaignId={gameCampaignId} />
            )}
          </Fragment>
        )}
      </Box>
    </Card>
  );
});
CreateCampaignStepper.displayName = "CreateCampaignStepper";

export default CreateCampaignStepper;