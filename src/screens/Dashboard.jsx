import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useExpense } from "../context/ExpenseContext";
import IncomeCard from "../components/IncomeCard";
import SummaryCards from "../components/SummaryCards";
import WeeklySummary from "../components/WeeklySummary";
import EditIncomeModal from "../components/EditIncomeModal";


const Dashboard = () => {
  const navigate = useNavigate();
  const { income, totalSpent, balance, weeklySummary } = useExpense();
  const [openIncomeModal, setOpenIncomeModal] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* ---------- HEADER ---------- */}
      <Box mb={4} textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          ₹ Expense Tracker
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your spending
        </Typography>
      </Box>

      {/* ---------- SUMMARY SECTION ---------- */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <IncomeCard
            amount={income}
            onEdit={() => setOpenIncomeModal(true)}
          />
          <SummaryCards spent={totalSpent} balance={balance} />
        </Stack>

        {/* ---------- ADD EXPENSE ---------- */}
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/add-expense")}
          >
            + Add Expense
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* ---------- WEEKLY SUMMARY ---------- */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
        <WeeklySummary data={weeklySummary} />
      </Paper>

      {/* ---------- HISTORY LINK ---------- */}
      <Box mt={3} textAlign="center">
        <Button variant="text" onClick={() => navigate("/history")}>
          View History & Reports →
        </Button>
      </Box>

      {/* ---------- EDIT INCOME MODAL ---------- */}
      <EditIncomeModal
        open={openIncomeModal}
        onClose={() => setOpenIncomeModal(false)}
      />
    </Box>
  );
};

export default Dashboard;
