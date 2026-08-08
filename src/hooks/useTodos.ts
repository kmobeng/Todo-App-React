import { useState, useEffect } from "react";
import type { Todo } from "../types";

const BASE_URL = "http://localhost:8000/api";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch(`${BASE_URL}/todo`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data.data as Todo[]);
      } catch {
        setError("Internal server error. Couldn't load tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  async function toggleTodo(id: string, event: React.ChangeEvent<HTMLInputElement>) {
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

      setError(null);
    } catch {
      setError("Couldn't update the task.");
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

      setError(null);
    } catch {
      setError("Couldn't delete the task.");
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
        setError(null);
      } catch {
        setError("Couldn't add the task.");
      }
    }
  }

  function clearError() {
    setError(null);
  }

  return { todos, loading, error, toggleTodo, deleteTodo, addTodo, clearError };
}
