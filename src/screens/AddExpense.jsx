import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@mui/system";

import { useExpense } from "../context/ExpenseContext";

/* ---------- SUBTLE ANIMATION ---------- */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpense();

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    upi: "Google Pay",
    amount: "",
  });

  const [showToast, setShowToast] = useState(false);

  const isValid = form.description.trim() && Number(form.amount) > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isValid) return;

    addExpense({
      ...form,
      amount: Number(form.amount),
    });

    setShowToast(true);
    setTimeout(() => navigate("/"), 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafc",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* ---------- HEADER ---------- */}
      <Box
        textAlign="center"
        mb={4}
        sx={{ animation: `${fadeUp} 0.35s ease-out` }}
      >
        <Typography variant="h4" fontWeight={600}>
          ₹ Expense Tracker
        </Typography>
      </Box>

      {/* ---------- FORM CARD ---------- */}
      <Paper
        sx={{
          maxWidth: 480,
          mx: "auto",
          p: 3,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          animation: `${fadeUp} 0.45s ease-out`,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          transition: "0.25s",
          "&:hover": {
            boxShadow: "0 12px 30px rgba(0,0,0,0.07)",
          },
        }}
      >
        <Typography variant="h6" mb={2} fontWeight={600}>
          Add Expense
        </Typography>

        <Stack spacing={3} onKeyDown={handleKeyDown}>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            autoFocus
            fullWidth
          />

          <TextField
            select
            label="UPI Used"
            name="upi"
            value={form.upi}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Google Pay">Google Pay</MenuItem>
            <MenuItem value="PhonePe">PhonePe</MenuItem>
            <MenuItem value="NaviPay">NaviPay</MenuItem>
            <MenuItem value="SuperMoney">SuperMoney</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            label="Amount (₹)"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
          />

          {/* ---------- ACTION ---------- */}
          <Button
            variant="contained"
            size="large"
            disabled={!isValid}
            onClick={handleSubmit}
            sx={{
              mt: 1,
              backgroundColor: isValid ? "#e3f2fd" : undefined,
              color: "#1976d2",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#dbeafe",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Add Expense
          </Button>
        </Stack>
      </Paper>

      {/* ---------- DASHBOARD BUTTON (KEPT) ---------- */}
      <Box textAlign="center" mt={3}>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{
            borderColor: "#ffffff",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#ffa200",
              borderColor: "#f6f6f6",
            },
          }}
        >
          ← Dashboard
        </Button>
      </Box>

      {/* ---------- SUCCESS TOAST ---------- */}
      <Snackbar
        open={showToast}
        autoHideDuration={1200}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="outlined"
          sx={{
            backgroundColor: "#f0fdf4",
            color: "#166534",
            borderColor: "#bbf7d0",
            animation: `${fadeUp} 0.25s ease-out`,
          }}
        >
          Expense added successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddExpense;
