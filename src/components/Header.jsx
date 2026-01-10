import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box py={2} textAlign="center">
      <Typography variant="h5" fontWeight="bold">
        ₹ Expense Tracker
      </Typography>
    </Box>
  );
};

export default Header;
