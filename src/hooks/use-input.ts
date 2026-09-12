import { useState, useEffect } from "react";

export function useInput(handler: (input: string, key: { ctrl: boolean; meta: boolean; return: boolean; escape: boolean }) => void): string {
  const [input, setInput] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (event: KeyboardEvent) => {
      const key = {
        ctrl: event.ctrlKey,
        meta: event.metaKey,
        return: event.key === "Enter",
        escape: event.key === "Escape",
      };
      handler(event.key, key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
  return input;
}