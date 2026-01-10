import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const MonthlyReport = ({ data = {} }) => {
  const months = Object.keys(data);

  if (!months.length) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <CalendarMonthIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        <Typography variant="h6">Monthly Report</Typography>
        <Typography variant="body2" color="text.secondary">
          No expenses recorded yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        Monthly Report
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Month-wise spending overview
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={1.5}>
        {months.map((month) => (
          <Paper
            key={month}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f8fafc",
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 3,
              },
            }}
          >
            <Typography fontWeight={600}>
              {month}
            </Typography>

            <Typography fontWeight="bold" color="error">
              ₹ {data[month].total}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

export default MonthlyReport;
