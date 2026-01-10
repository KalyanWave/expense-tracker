import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getWeekRange, getMonthKey } from "../utils/dateUtils";
import { buildWeeklyReport, buildMonthlyReport } from "../utils/reportUtils";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  /* ---------------- CORE STATE ---------------- */

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);

  /* ---------------- DERIVED VALUES ---------------- */

  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }, [expenses]);

  const balance = useMemo(() => {
    return income - totalSpent;
  }, [income, totalSpent]);

  const weeklySummary = useMemo(() => {
    return buildWeeklyReport(expenses);
  }, [expenses]);

  const monthlySummary = useMemo(() => {
    return buildMonthlyReport(expenses);
  }, [expenses]);

  /* ---------------- ACTIONS ---------------- */

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...expense,
      },
    ]);
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedExpense } : e))
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  /* ---------------- MONTH RESET LOGIC ---------------- */

  useEffect(() => {
    const currentMonth = getMonthKey(new Date());
    const savedMonth = localStorage.getItem("currentMonth");

    if (savedMonth && savedMonth !== currentMonth) {
      // New month → reset everything
      setExpenses([]);
      setIncome(0);
    }

    localStorage.setItem("currentMonth", currentMonth);
  }, []);

  /* ---------------- CONTEXT VALUE ---------------- */

  const value = {
    // state
    income,
    expenses,

    // derived
    totalSpent,
    balance,
    weeklySummary,
    monthlySummary,

    // actions
    setIncome,
    addExpense,
    editExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

/* ---------------- CUSTOM HOOK ---------------- */

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used inside ExpenseProvider");
  }
  return context;
};
