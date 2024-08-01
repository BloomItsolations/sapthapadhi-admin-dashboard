export function calculateDueAmountSum(data) {
  let totalDueAmount = 0;

  for (const customer of data) {
    for (const entry of customer.CustomerBeedingEntries) {
      if (entry.due_amount) {
        totalDueAmount += parseFloat(entry.due_amount);
      }
    }
  }

  return totalDueAmount;
}
export function calculatePayableAmountSum(data) {
  let totalPayableAmount = 0;

  for (const customer of data) {
    for (const entry of customer.CustomerBeedingEntries) {
      if (entry.payable_amount) {
        totalPayableAmount += parseFloat(entry.payable_amount);
      }
    }
  }

  return totalPayableAmount;
}
export function findLatestNetBalance(records) {
  if (!Array.isArray(records) || records.length === 0) {
    return null;
  }

  // Create a copy of the records and sort it by updatedAt in descending order
  const sortedRecords = [...records];
  sortedRecords.sort(
    (a, b) =>
      new Date(b.CustomerBeedingEntry.updatedAt) -
      new Date(a.CustomerBeedingEntry.updatedAt)
  );

  // Get the net_balance of the latest record
  return parseFloat(sortedRecords[0].net_balance);
}
const getColor = (dueAmount, beedDate) => {
  const currentDate = new Date();
  const daysDifference =
    (currentDate - new Date(beedDate)) / (1000 * 60 * 60 * 24);

  if (dueAmount > 0) {
    if (daysDifference > 10) {
      return "#FF0000"; // Red color after 10 days from beedDate
    } else if (daysDifference > 5) {
      return "#FFFF00"; // Yellow color after 5 days from beedDate
    }
  }
  return "#FFFFFF"; // Default color if no conditions are met
};

export function getColorForDueAmount(customer) {
  const beedDate = customer.CustomerBeedingEntries[0].beedDate;
  const dueAmount = parseFloat(customer.totalDueAmount);
  const color = getColor(dueAmount, beedDate);
  return color;
}
export function getColorForPayableAmount(customer) {
  const beedDate = customer.CustomerBeedingEntries[0].beedDate;
  const payableAmount = parseFloat(customer.totalPayableAmount);
  const color = getColor(payableAmount, beedDate);
  return color;
}
