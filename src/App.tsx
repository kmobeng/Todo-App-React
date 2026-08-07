import { useState, useEffect } from "react";
import Todo from "./Todo";

function App() {
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

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="App">
      <div className="top">
        <div className="top-left">
          <p>Today</p>
          <p>{formattedDate}</p>
        </div>
        <p>3 of 7</p>
      </div>
      <form className="form">
        <input
          type="text"
          aria-label="enter text"
          placeholder="Add a task"
          name="task"
        />
        <button type="submit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
      <Todo />
    </div>
  );
}

export default App;
