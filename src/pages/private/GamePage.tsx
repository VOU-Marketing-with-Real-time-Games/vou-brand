import { useState, useEffect } from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, Modal, Backdrop } from "@mui/material";
import gameInfoApi from "../../api/game.api";
import { IGameInfo } from "../../types/game.type";
import GameDetails from "../../components/modals-content/GameDetails";

const GamePage = () => {
  const [games, setGames] = useState<IGameInfo[]>([]);
  const [selectedGame, setSelectedGame] = useState<IGameInfo | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await gameInfoApi.getAllGames();
      setGames(data);
    };
    fetchGames().then();
  }, []);

  const handleOpen = (game: IGameInfo) => {
    setSelectedGame(game);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGame(null);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-start", width: "100%" }}>
      {games.map((game) => (
        <Card key={game.id} sx={{ width: 200, height: 220 }}>
          <CardActionArea onClick={() => handleOpen(game)}>
            <CardMedia component="img" sx={{ width: 200, height: 140 }} image={game.image} alt={game.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", marginTop: "1rem"}}>
                {game.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <Modal
        tabIndex={-1}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <>{selectedGame && <GameDetails game={selectedGame} onClose={handleClose} />}</>
      </Modal>
    </Box>
  );
};

export default GamePage;
