import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ExpenseProvider } from "./context/ExpenseContext";

import Dashboard from "./screens/Dashboard";
import AddExpense from "./screens/AddExpense";
import History from "./screens/History";

const App = () => {
  return (
    <ExpenseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </ExpenseProvider>
  );
};

export default App;
