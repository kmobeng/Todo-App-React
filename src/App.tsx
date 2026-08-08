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

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch(`${BASE_URL}/todo`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data.data as Todo[]);
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    };

    loadTodos();
  }, []);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  async function handleCheckboxChange(id: string, event: React.ChangeEvent<HTMLInputElement>) {
    const completed = event.target.checked;

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === id ? { ...todo, completed } : todo))
    );

    try {
      const response = await fetch(`${BASE_URL}/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, completed: !completed } : todo))
      );
    }
  }

  async function deleteTodo(id: string) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));

    try {
      const response = await fetch(`${BASE_URL}/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

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
    <Todo
      key={el._id}
      task={el.task}
      id={el._id}
      isCompleted={el.completed}
      handleCheckboxChange={(event) => handleCheckboxChange(el._id, event)}
      handleDelete={() => deleteTodo(el._id)}
    />
  ));

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="App">
      <div className="top">
        <div className="top-left">
          <p>Today</p>
          <p>{formattedDate}</p>
        </div>
        <p>{completedCount} of {todos.length}</p>
      </div>
      <form className="form" action={addTodo}>
        <input
          type="text"
          aria-label="enter text"
          placeholder="Add a task"
          name="task"
          autoComplete="off"
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
