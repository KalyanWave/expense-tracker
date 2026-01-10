/* ---------------- DATE FORMAT HELPERS ---------------- */

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
};

/* ---------------- WEEK HELPERS ---------------- */

/**
 * Returns week range for a given date
 * Example: Jan 8–14
 */
export const getWeekRange = (date) => {
  const d = new Date(date);

  // Make Monday the start of the week
  const day = d.getDay() || 7;
  if (day !== 1) {
    d.setHours(-24 * (day - 1));
  }

  const start = new Date(d);
  const end = new Date(d);
  end.setDate(start.getDate() + 6);

  const options = { month: "short", day: "numeric" };

  return {
    start,
    end,
    label: `${start.toLocaleDateString("en-US", options)}–${end.toLocaleDateString("en-US", options)}`,
  };
};

/* ---------------- MONTH HELPERS ---------------- */

/**
 * Used for month reset detection
 * Example: "2026-01"
 */
export const getMonthKey = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

/**
 * Human readable month label
 * Example: "January 2026"
 */
export const getMonthLabel = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};
