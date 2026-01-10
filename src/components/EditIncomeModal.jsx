import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import { useExpense } from "../context/ExpenseContext";

const EditIncomeModal = ({ open, onClose }) => {
  const { income, setIncome } = useExpense();
  const [value, setValue] = useState(income);

  useEffect(() => {
    setValue(income);
  }, [income]);

  const handleSave = () => {
    setIncome(Number(value) || 0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Set / Edit Monthly Income</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Monthly Income (₹)"
          type="number"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditIncomeModal;
