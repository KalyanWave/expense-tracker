import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const IncomeCard = ({ amount, onEdit }) => {
  return (
    <Card
      onClick={onEdit}
      sx={{
        flex: 1,
        cursor: "pointer",
        backgroundColor: "#e3f2fd",
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <AccountBalanceWalletIcon color="primary" fontSize="large" />

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Income
            </Typography>

            <Typography variant="h5" fontWeight="bold" color="primary">
              ₹ {amount || 0}
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          mt={1}
          display="block"
        >
          Tap to edit
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IncomeCard;
