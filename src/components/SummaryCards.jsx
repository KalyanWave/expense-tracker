import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const SummaryCards = ({ spent, balance }) => {
  return (
    <Stack direction="row" spacing={2} flex={2}>
      {/* -------- SPENT -------- */}
      <Card
        sx={{
          flex: 1,
          backgroundColor: "#ffebee",
          borderRadius: 3,
          transition: "0.2s",
          "&:hover": { boxShadow: 3 },
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <ArrowDownwardIcon color="error" />

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Spent
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="error">
                ₹ {spent}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* -------- BALANCE -------- */}
      <Card
        sx={{
          flex: 1,
          backgroundColor: "#e8f5e9",
          borderRadius: 3,
          transition: "0.2s",
          "&:hover": { boxShadow: 3 },
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <ArrowUpwardIcon
              color={balance < 0 ? "error" : "success"}
            />

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Balance
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={balance < 0 ? "error" : "success.main"}
              >
                ₹ {balance}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SummaryCards;
