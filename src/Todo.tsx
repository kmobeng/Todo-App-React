import { useState } from "react";

export default function Todo(props: { task: string; id: string }) {
  const [isCompleted, setIsCompleted] = useState(false);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsCompleted(event.target.checked);
  }

  return (
    <div className="todo-container" style={{ cursor: "pointer" }}>
      <div className="todo" >
        <input
          type="checkbox"
          id={props.id}
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={props.id} className={isCompleted ? "completed" : ""} style={{ cursor: "pointer" }}>
          {props.task}
        </label>
      </div>

      <button className="delete-button" aria-label="Delete task">
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
