import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Tooltip
} from "@material-ui/core";

const WinnersList = ({ winners }) => {
  const renderList = (e, i) => (
    <ListItem key={i}>
      <Tooltip title={e.winner} placement="top-start">
        <ListItemText
          primary={
            e.winner.length < 20 ? e.winner : `${e.winner.slice(0, 17)}...` // if nickname is to long
          }
        />
      </Tooltip>
      <ListItemText primary={<Typography align="right">{e.date}</Typography>} />
    </ListItem>
  );
  return <List>{!!winners.length && winners.map(renderList)}</List>;
};

export default WinnersList;
