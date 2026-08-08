import Todo from "./Todo";
import type { Todo as TodoItem } from "../types";

interface TodoListProps {
  todos: TodoItem[];
  loading: boolean;
  onToggle: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, loading, onToggle, onDelete }: TodoListProps) {
  if (loading) {
    return (
      <div className="loading-state">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading tasks…</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <i className="fa-regular fa-clipboard"></i>
        <p>No tasks yet — add one above.</p>
      </div>
    );
  }

  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          task={todo.task}
          id={todo._id}
          isCompleted={todo.completed}
          handleCheckboxChange={(event) => onToggle(todo._id, event)}
          handleDelete={() => onDelete(todo._id)}
        />
      ))}
    </>
  );
}
