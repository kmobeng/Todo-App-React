import { useState } from "react";

export default function Todo() {
  const [isCompleted, setIsCompleted] = useState(false);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsCompleted(event.target.checked);
  }

  return (
    <div className="todo-container">
      <div className="todo">
        <input
          type="checkbox"
          id="task"
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="task"
          className={isCompleted ? "completed" : ""}
          style={{ cursor: "pointer" }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut ad soluta
          dicta error voluptas ipsam quis, voluptatibus velit provident quam
          quos eaque deleniti ea odit fugiat aspernatur? Cupiditate, id
          voluptate.
        </label>
      </div>

      <button className="delete-button" aria-label="Delete task">
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
