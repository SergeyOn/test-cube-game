import React, { useContext } from "react";

import { TextField } from "@material-ui/core";

import { GameContext } from "context/GameContext";

const NameInput = () => {
  const gameCtx = useContext(GameContext);
  const { username, changeName, gameInProcess } = gameCtx;

  const handleInputChange = e => {
    if (gameInProcess) return; // cant change while game is on
    changeName(e.target.value);
  };
  return (
      <TextField
        variant="outlined"
        type="text"
        value={username}
        onChange={e => handleInputChange(e)}
        placeholder="Your Name"
      />
  );
};

export default NameInput;
