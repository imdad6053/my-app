//@ts-nocheck
import dayjs from "dayjs";

export const stringToMinutes = (str) =>
  str.split(":").reduce((h, m) => h * 60 + +m);

export const minutesToString = (min) =>
  Math.floor(min / 60).toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
  ":" +
  (min % 60).toLocaleString("en-US", { minimumIntegerDigits: 2 });

export default function getTimeSlots(startStr, endStr, isToday, interval = 30) {
  let start = stringToMinutes(startStr);
  let end = stringToMinutes(endStr);
  let current = isToday
    ? stringToMinutes(dayjs().add(interval, "minute").format("HH:00"))
    : 0;

  if (current > end) {
    return [];
  }

  if (current > start) {
    start = current;
  }

  return Array.from(
    { length: Math.floor((end - start) / interval) + 1 },
    (_, i) => minutesToString(start + i * interval)
  );
}
