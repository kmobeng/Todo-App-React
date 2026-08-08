import { useState, useEffect } from "react";

export function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const updateDateIfChanged = () => {
      const now = new Date();

      const currentDateString = now.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      const storedDateString = date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      if (currentDateString !== storedDateString) {
        setDate(now);
      }
    };

    const timerId = setInterval(updateDateIfChanged, 60000);

    return () => clearInterval(timerId);
  }, [date]);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
