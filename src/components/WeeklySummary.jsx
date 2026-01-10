import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const WeeklySummary = ({ data = [] }) => {
  if (!data.length) {
    return (
      <Paper sx={{ p: 4, textAlign: "center", backgroundColor: "#fafafa" }}>
        <AssessmentIcon sx={{ fontSize: 52, color: "text.secondary", mb: 1 }} />
        <Typography variant="h6">Weekly Report</Typography>
        <Typography variant="body2" color="text.secondary">
          Add expenses to generate your weekly spending report.
        </Typography>
      </Paper>
    );
  }

  const highest = Math.max(...data.map((w) => w.total));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        Weekly Report
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Summary of your spending by week
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={1.5}>
        {data.map((week, index) => {
          const isHighest = week.total === highest;
          const weekNumber = data.length - index;

          return (
            <Paper
              key={index}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: isHighest ? "#fff8e1" : "#f8fafc",
                border: isHighest
                  ? "2px solid #ffb300"
                  : "1px solid #e0e0e0",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
              }}
            >
              <Box>
                <Typography fontWeight={600}>
                  Week {weekNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {week.label}
                </Typography>
              </Box>

              <Box textAlign="right">
                {isHighest && (
                  <Chip
                    icon={<WhatshotIcon />}
                    label="Highest Spend"
                    color="warning"
                    size="small"
                    sx={{ mb: 0.5 }}
                  />
                )}
                <Typography variant="h6" fontWeight="bold" color="error">
                  ₹ {week.total}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default WeeklySummary;
