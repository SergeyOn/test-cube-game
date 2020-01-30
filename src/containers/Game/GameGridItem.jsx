import React from "react";

const GameGridItem = ({ row, sqr, backgroundColor, cursor }) => {
  return (
    <div
      className="game__grid__item"
      data-row={row} // coords to handle in click
      data-sqr={sqr} // coords to handle in click
      style={{
        backgroundColor,
        cursor
      }}
    />
  );
};

export default GameGridItem;
