import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const GameCampaignForm = ({
  onNext,
  onBack,
}: {
  onNext: (gameInfoId: number, gameType: "QUIZZ" | "SHAKE") => void;
  onBack: () => void;
}) => {
  const games = [
    { id: 1, name: "Quizz Game", type: "QUIZZ" },
    { id: 2, name: "Shake Game", type: "SHAKE" },
  ];

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Select Game Type
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {games.map((game) => (
          <Grid item key={game.id}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onNext(game.id, game.type as "QUIZZ" | "SHAKE")}
              sx={{ minWidth: 120 }}
            >
              {game.name}
            </Button>
          </Grid>
        ))}
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