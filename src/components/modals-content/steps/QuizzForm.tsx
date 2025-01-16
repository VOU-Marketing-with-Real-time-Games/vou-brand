import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import gameCampaignApi from "../../../api/gameCampaign.api";
import toast from "react-hot-toast";

const QuizzForm = ({
  onNext,
  onBack,
  gameCampaignId,
}: {
  onNext: () => void;
  onBack: () => void;
  gameCampaignId: number | null;
}) => {
  const [quizzData, setQuizzData] = useState({
    name: "",
    description: "",
    secondPerQuestion: 0,
    startTime: "",
    campaignGameId: gameCampaignId ?? 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizzData({ ...quizzData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await gameCampaignApi.createGameCampaign({
        ...quizzData,
        gameCampaignId: gameCampaignId ?? 0,
      });
      toast.success("Quizz created successfully");
      onNext();
    } catch (error) {
      toast.error("Failed to create quizz");
      console.error("Failed to create quizz", error);
    }
  };

  return (
    <Box>
      <TextField name="name" label="Name" value={quizzData.name} onChange={handleChange} fullWidth />
      <TextField
        name="description"
        label="Description"
        value={quizzData.description}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="secondPerQuestion"
        label="Seconds per Question"
        value={quizzData.secondPerQuestion}
        onChange={handleChange}
        fullWidth
      />
      <TextField name="startTime" label="Start Time" value={quizzData.startTime} onChange={handleChange} fullWidth />
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
    </Box>
  );
};

export default QuizzForm;
