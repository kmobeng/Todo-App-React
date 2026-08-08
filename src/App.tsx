import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ErrorBanner from "./components/ErrorBanner";
import { useCurrentDate } from "./hooks/useCurrentDate";
import { useTodos } from "./hooks/useTodos";

function App() {
  const formattedDate = useCurrentDate();
  const { todos, loading, error, toggleTodo, deleteTodo, addTodo, clearError } = useTodos();

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="App">
      <Header formattedDate={formattedDate} completed={completedCount} total={todos.length} />
      {error && <ErrorBanner message={error} onDismiss={clearError} />}
      <TodoForm onAddTask={addTodo} />
      <TodoList
        todos={todos}
        loading={loading}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
