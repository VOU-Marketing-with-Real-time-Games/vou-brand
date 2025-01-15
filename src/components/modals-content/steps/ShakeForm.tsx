import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const ShakeForm = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [shakeData, setShakeData] = useState({ name: "", description: "", campaignGameId: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShakeData({ ...shakeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Call API to create shake game
    onNext();
  };

  return (
    <Box>
      <TextField name="name" label="Name" value={shakeData.name} onChange={handleChange} fullWidth />
      <TextField
        name="description"
        label="Description"
        value={shakeData.description}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="campaignGameId"
        label="Campaign Game ID"
        value={shakeData.campaignGameId}
        onChange={handleChange}
        fullWidth
      />
      <Button onClick={onBack}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
    </Box>
  );
};

export default ShakeForm;
