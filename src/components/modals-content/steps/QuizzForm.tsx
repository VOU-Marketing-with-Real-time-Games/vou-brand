import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const QuizzForm = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [quizzData, setQuizzData] = useState({
    name: "",
    description: "",
    secondPerQuestion: 0,
    startTime: "",
    campaignGameId: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizzData({ ...quizzData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Call API to create quizz
    onNext();
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
      <TextField
        name="campaignGameId"
        label="Campaign Game ID"
        value={quizzData.campaignGameId}
        onChange={handleChange}
        fullWidth
      />
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
    </Box>
  );
};

export default QuizzForm;
