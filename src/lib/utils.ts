import { KeyboardEvent } from "react";

export function onKeyCallback(key: string, callback: (event: KeyboardEvent<HTMLElement>) => void) {
  return (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === key) callback(event);
  };
}