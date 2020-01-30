import React, { useContext } from "react";

import { Button } from "@material-ui/core";

import { GameContext } from "context/GameContext";

const PlayBtn = () => {
  const gameCtx = useContext(GameContext);
  const {
    username,
    changeName,
    togglePlay,
    gameInProcess,
    resetWinner,
    mode,
    winner
  } = gameCtx;
  return (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          if (!username) changeName("Anonymous Player"); // set username if empty in game context
          if (!mode.field) return; // cannot play without params
          togglePlay(); // set play in game context
          resetWinner(); // reset current winner in game context
        }}
      >
        {gameInProcess ? "reset" : winner ? "play again" : "play"}
        {/*
         * button text:
         * case 1 if game is in progress user can "reset"
         * case 2 if game is not in progress and we have a winner user can "play again"
         * case 3 if game is not in progress and we have no winner user can "play" (first time or after reset)
         */}
      </Button>
  );
};

export default PlayBtn;
