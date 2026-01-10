import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useExpense } from "../context/ExpenseContext";
import ExpenseTable from "../components/ExpenseTable";

const History = () => {
  const navigate = useNavigate();
  const { expenses } = useExpense();

  return (
    <Box p={3}>
      {/* ---------- HEADER ---------- */}
      <Typography variant="h4" align="center" gutterBottom>
        ₹ Expense Tracker
      </Typography>

      {/* ---------- ACTION BAR ---------- */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate("/add-expense")}
        >
          Add Expense
        </Button>

        <Button
          variant="outlined"
          onClick={() => alert("Weekly Report coming next")}
        >
          Weekly Report
        </Button>

        <Button
          variant="outlined"
          onClick={() => alert("Monthly Report coming next")}
        >
          Monthly Report
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* ---------- EXPENSE HISTORY ---------- */}
      <Typography variant="h6" gutterBottom>
        Expense History
      </Typography>

      <ExpenseTable data={expenses} />

      {/* ---------- BACK ---------- */}
      <Box mt={3} textAlign="center">
        <Button variant="text" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default History;
