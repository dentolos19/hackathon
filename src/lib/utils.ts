import { KeyboardEvent } from "react";

export function humanizeDate(date: Date) {
  return humanizeDateString(date.toISOString());
}

export function humanizeDateString(date: string) {
  let currentDate = new Date();
  let targetDate = currentDate;

  if (!date.includes("T")) {
    targetDate = new Date(`${date}T00:00:00`);
  }

  return targetDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function onKeyCallback(key: string, callback: (event: KeyboardEvent<HTMLElement>) => void) {
  return (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === key) callback(event);
  };
}