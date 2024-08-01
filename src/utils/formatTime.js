import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export const getRangeDates = (sDate, eDate) => {
  let dateList = [],
    d;
  for (
    dateList, d = new Date(sDate);
    d <= new Date(eDate);
    d.setDate(d.getDate() + 1)
  ) {
    dateList.push(new Date(d).toISOString().slice(0, 10));
  }
  return dateList;
};
export const diffInDays = (sDate, eDate) => {
  let diffInMs = new Date(eDate) - new Date(sDate);
  let days = diffInMs / (1000 * 60 * 60 * 24);
  return days;
};
