import React from "react";
import GameGridItem from "./GameGridItem";

import { Box } from "@material-ui/core";

import "./GameGrid.sass";

const GameGrid = ({ grid, numRows, handleClick }) => (
  <Box display="flex" justifyContent="center">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numRows}, minmax(10px, 40px))` /* todo: set minmax via css for mobile*/
      }}
      onClick={e => {
        handleClick(e.target.dataset); // propagate click on grid
      }}
      className="game__grid"
    >
      {grid.map((rows, i) =>
        rows.map((_, k) => {
          let backgroundColor; // set bgc style for states
          switch (grid[i][k]) {
            case 1: // active
              backgroundColor = "lightblue"; 
              break;
            case 2: // achived by user
              backgroundColor = "lightgreen";
              break;
            case 3: // achived by "ai"
              backgroundColor = "red";
              break;
            default:
              backgroundColor = "#FFFFFF";
          }
          const cursor = grid[i][k] === 1 ? "pointer" : "initial"; // cursor style for active sqr
          return (
            <GameGridItem
              key={`${i}-${k}`}
              row={i}
              sqr={k}
              cursor={cursor}
              backgroundColor={backgroundColor}
            />
          );
        })
      )}
    </div>
  </Box>
);

export default GameGrid;
