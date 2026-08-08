import { useState, useEffect } from "react";
import Todo from "./Todo";

const BASE_URL = "http://localhost:8000/api";

interface Todo {
  task: string;
  completed: boolean;
  createdAt: string;
  _id: string;
}

function App() {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);

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

  async function addTodo(formData: FormData) {
    const task = formData.get("task") as string;
    if (task) {
      try {
        const response = await fetch(`${BASE_URL}/todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        });


        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTodos((prevTodos) => [...prevTodos, data.data as Todo]);

      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  }

  const TodoElements = todos.map((el) => (
    <Todo key={el._id} task={el.task} id={el._id} />
  ));



  return (
    <div className="App">
      <div className="top">
        <div className="top-left">
          <p>Today</p>
          <p>{formattedDate}</p>
        </div>
        <p>3 of 7</p>
      </div>
      <form className="form" action={addTodo}>
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
      {TodoElements}
    </div>
  );
}

export default App;
