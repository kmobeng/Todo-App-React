interface TodoProps {
  task: string;
  id: string;
  isCompleted: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
}

export default function Todo(props: TodoProps) {
  

  return (
    <div className="todo-container" style={{ cursor: "pointer" }}>
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

      <button className="delete-button" aria-label="Delete task" onClick={props.handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
