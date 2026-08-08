interface TodoFormProps {
  onAddTask: (formData: FormData) => void;
}

export default function TodoForm({ onAddTask }: TodoFormProps) {
  return (
    <form className="form" action={onAddTask}>
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
  );
}
