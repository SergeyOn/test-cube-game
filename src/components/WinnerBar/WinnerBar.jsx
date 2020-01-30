import React, { useContext } from "react";
import { GameContext } from "context/GameContext";
import { Box, Typography } from "@material-ui/core";

const WinnerBar = () => {
  const gameCtx = useContext(GameContext);
  const { gameInProcess, winner } = gameCtx;
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center">
      <Typography variant="h4" gutterBottom>
        {/* check if we have a winner and game is over, than show text */}
        {winner && !gameInProcess && `${winner} is winner!`} &emsp; {/* blank space to avoid flickering*/}      
      </Typography>
    </Box>
  );
};

export default WinnerBar;
