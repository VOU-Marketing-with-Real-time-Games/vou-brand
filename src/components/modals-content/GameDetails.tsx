import { forwardRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Switch,
} from "@mui/material";
import { IGameInfo } from "../../types/game.type";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import gameInfoApi from "../../api/game.api";
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
  [theme.breakpoints.up("sm")]: {
    width: "fit-content",
    maxWidth: "80%",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface GameDetailsProps {
  game: IGameInfo;
  onClose: () => void;
}

const GameDetails = forwardRef<HTMLDivElement, GameDetailsProps>(({ game, onClose }, ref) => {
  const [enable, setEnable] = useState(game.enable);

  const handleToggleEnable = async () => {
    try {
      const updatedGame = await gameInfoApi.updateGame(game.id, { ...game, enable: !enable });
      setEnable(updatedGame.enable);
      toast.success("Game enable status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update game enable status");
    }
  };

  return (
    <Card ref={ref}>
      <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: "center" }}>
        {game.name}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
        <Box sx={{ flex: "1 1 40%", textAlign: "center" }}>
          <img src={game.image} alt={game.name} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
        </Box>
        <Box sx={{ flex: "1 1 60%" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Type</TableCell>
                  <TableCell>{game.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Manual</TableCell>
                  <TableCell>{game.manual}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "primary" }}>Enable</TableCell>
                  <TableCell>
                    <Switch checked={enable} onChange={handleToggleEnable} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Card>
  );
});

GameDetails.displayName = "GameDetails";
export default GameDetails;
