import { getWeekRange, getMonthKey } from "./dateUtils";

/* ---------------- WEEKLY REPORT ---------------- */

/**
 * Groups expenses into weekly buckets
 * Output:
 * [
 *   {
 *     label: "Jan 8–14",
 *     total: 250,
 *     items: [...]
 *   }
 * ]
 */
export const buildWeeklyReport = (expenses = []) => {
  const map = {};

  expenses.forEach((expense) => {
    const { label } = getWeekRange(expense.date);

    if (!map[label]) {
      map[label] = {
        label,
        total: 0,
        items: [],
      };
    }

    map[label].total += Number(expense.amount);
    map[label].items.push(expense);
  });

  return Object.values(map).sort((a, b) => b.items[0].date - a.items[0].date);
};

/* ---------------- MONTHLY REPORT ---------------- */

/**
 * Groups expenses by month
 * Output:
 * {
 *   "2026-01": {
 *      total: 1200,
 *      items: [...]
 *   }
 * }
 */
export const buildMonthlyReport = (expenses = []) => {
  const map = {};

  expenses.forEach((expense) => {
    const key = getMonthKey(expense.date);

    if (!map[key]) {
      map[key] = {
        total: 0,
        items: [],
      };
    }

    map[key].total += Number(expense.amount);
    map[key].items.push(expense);
  });

  return map;
};
