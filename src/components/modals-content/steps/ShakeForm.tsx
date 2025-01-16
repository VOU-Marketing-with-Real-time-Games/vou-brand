import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import puzzleApi from "../../../api/puzzle.api";
import toast from "react-hot-toast";

const ShakeForm = ({ onNext, onBack, gameCampaignId }: { onNext: () => void; onBack: () => void; gameCampaignId: number | null }) => {
  const [puzzleData, setPuzzleData] = useState({
    name: "",
    description: "",
    itemNum: 9, // Set the number of items to 9
    campaignGameId: gameCampaignId ?? 0,
    items: [],
  });
  const [itemSets, setItemSets] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPuzzleData({ ...puzzleData, [e.target.name]: e.target.value });
  };

  const handleItemSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemSets(Number(e.target.value));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!puzzleData.name) newErrors.name = "Name is required";
    if (!puzzleData.description) newErrors.description = "Description is required";
    if (itemSets <= 0) newErrors.itemSets = "Number of Item Sets must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const items = Array.from({ length: 9 }, (_, i) => ({
      position: i + 1,
      description: `item ${i + 1}`,
      total: 0,
    }));

    for (let i = 0; i < itemSets; i++) {
      const randomIndex = Math.floor(Math.random() * 9);
      items[randomIndex].total += 1;
    }

    try {
      await puzzleApi.createPuzzle({
        ...puzzleData,
        campaignGameId: gameCampaignId ?? 0,
        items,
      });
      toast.success("Puzzle created successfully");
      onNext();
    } catch (error) {
      toast.error("Failed to create puzzle");
      console.error("Failed to create puzzle", error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            value={puzzleData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            value={puzzleData.description}
            onChange={handleChange}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="itemSets"
            label="Number of Item Sets"
            value={itemSets}
            onChange={handleItemSetsChange}
            fullWidth
            error={!!errors.itemSets}
            helperText={errors.itemSets}
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={onBack} variant="outlined" fullWidth>
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShakeForm;