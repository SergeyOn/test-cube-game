import React from "react";
import {
  Typography,
  Box,
  Divider
} from "@material-ui/core";

const TableWithTitle = ({ title, children }) => {
  return (
    <Box>
      <Box pl={1.5}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Box>
      <Divider />
        {children}
    </Box>
  );
};

export default TableWithTitle;
