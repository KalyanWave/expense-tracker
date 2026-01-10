import jsPDF from "jspdf";
import { isLast7Days } from "./dateUtils";

/**
 * Helper to find most-used value for a given key
 */
const getMostUsedValue = (expenses, key) => {
  if (!expenses || expenses.length === 0) return "N/A";

  const countMap = {};

  expenses.forEach((exp) => {
    const value = exp[key];
    if (value) {
      countMap[value] = (countMap[value] || 0) + 1;
    }
  });

  let maxKey = "N/A";
  let maxCount = 0;

  Object.keys(countMap).forEach((k) => {
    if (countMap[k] > maxCount) {
      maxCount = countMap[k];
      maxKey = k;
    }
  });

  return maxKey;
};

/**
 * Generates Weekly Expense Report PDF (last 7 days)
 */
export const generateWeeklyPDF = (expenses) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Weekly Expense Report", 14, 15);

  const weeklyExpenses = expenses.filter((e) => isLast7Days(e.date));

  let y = 25;
  doc.setFontSize(10);

  if (weeklyExpenses.length === 0) {
    doc.text("No expenses in the last 7 days.", 14, y);
  } else {
    weeklyExpenses.forEach((e, index) => {
      doc.text(
        `${index + 1}. ${e.date} | ${e.desc} | ${e.finalUpi} | ₹${e.amount.toFixed(
          2
        )}`,
        14,
        y
      );
      y += 7;
    });
  }

  doc.save("weekly-expense-report.pdf");
};

/**
 * Generates Monthly Expense Report PDF (all data)
 * Includes summary insights
 */
export const generateMonthlyPDF = (expenses) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Monthly Expense Report", 14, 15);

  let y = 25;
  doc.setFontSize(10);

  if (!expenses || expenses.length === 0) {
    doc.text("No expenses available.", 14, y);
    doc.save("monthly-expense-report.pdf");
    return;
  }

  expenses.forEach((e, index) => {
    doc.text(
      `${index + 1}. ${e.date} | ${e.desc} | ${e.finalUpi} | ₹${e.amount.toFixed(
        2
      )}`,
      14,
      y
    );
    y += 7;

    // Create new page if needed
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  // Summary Section
  y += 10;
  doc.setFontSize(12);
  doc.text("Summary", 14, y);

  y += 8;
  doc.setFontSize(10);

  const mostUsedDesc = getMostUsedValue(expenses, "desc");
  const mostUsedUpi = getMostUsedValue(expenses, "finalUpi");

  doc.text(`• Most used description: ${mostUsedDesc}`, 14, y);
  y += 7;
  doc.text(`• Most used UPI app: ${mostUsedUpi}`, 14, y);

  doc.save("monthly-expense-report.pdf");
};
