import { Box, Button, Grid, Typography } from "@mui/material";

const GameCampaignForm = ({
  onSelectGameType,
  onBack,
}: {
  onSelectGameType: (type: "QUIZZ" | "SHAKE") => void;
  onBack: () => void;
}) => {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Select Game Type
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSelectGameType("QUIZZ")}
            sx={{ minWidth: 120 }}
          >
            Quizz
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onSelectGameType("SHAKE")}
            sx={{ minWidth: 120 }}
          >
            Shake
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={onBack} variant="outlined" sx={{ mt: 2 }}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameCampaignForm;