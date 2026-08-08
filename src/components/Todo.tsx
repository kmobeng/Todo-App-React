import { useState } from "react";

interface TodoProps {
  task: string;
  id: string;
  isCompleted: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
}

export default function Todo(props: TodoProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="todo-container" style={{ cursor: "pointer" }} onMouseLeave={() => setConfirming(false)}>
      <div className="todo" >
        <input
          type="checkbox"
          id={props.id}
          checked={props.isCompleted}
          onChange={props.handleCheckboxChange}
        />
        <label htmlFor={props.id} className={props.isCompleted ? "completed" : ""} style={{ cursor: "pointer" }}>
          {props.task}
        </label>
      </div>

      {confirming ? (
        <div className="confirm-buttons">
          <button className="confirm-yes" onClick={props.handleDelete}>
            Delete?
          </button>
          <button className="confirm-no" aria-label="Cancel delete" onClick={() => setConfirming(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ) : (
        <button className="delete-button" aria-label="Delete task" onClick={() => setConfirming(true)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      )}
    </div>
  );
}
