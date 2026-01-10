import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import { useExpense } from "../context/ExpenseContext";
import { formatDate } from "../utils/dateUtils";

const ExpenseTable = ({ data = [] }) => {
  const { editExpense, deleteExpense } = useExpense();

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (expense) => {
    setEditId(expense.id);
    setEditForm({ ...expense });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    editExpense(editId, editForm);
    cancelEdit();
  };

  if (!data.length) {
    return <p>No expenses added yet.</p>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>SL</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>UPI</TableCell>
          <TableCell align="right">Amount (₹)</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((expense, index) => {
          const isEditing = editId === expense.id;

          return (
            <TableRow key={expense.id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                {isEditing ? (
                  <TextField
                    type="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                    size="small"
                  />
                ) : (
                  formatDate(expense.date)
                )}
              </TableCell>

              <TableCell>
                {isEditing ? (
                  <TextField
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        description: e.target.value,
                      })
                    }
                    size="small"
                  />
                ) : (
                  expense.description
                )}
              </TableCell>

              <TableCell>
                {isEditing ? (
                  <TextField
                    value={editForm.upi}
                    onChange={(e) =>
                      setEditForm({ ...editForm, upi: e.target.value })
                    }
                    size="small"
                  />
                ) : (
                  expense.upi
                )}
              </TableCell>

              <TableCell align="right">
                {isEditing ? (
                  <TextField
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        amount: Number(e.target.value),
                      })
                    }
                    size="small"
                  />
                ) : (
                  `₹ ${expense.amount}`
                )}
              </TableCell>

              <TableCell align="center">
                {isEditing ? (
                  <>
                    <IconButton onClick={saveEdit} color="success">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={cancelEdit} color="error">
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => startEdit(expense)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteExpense(expense.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ExpenseTable;
