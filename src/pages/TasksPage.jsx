import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import TaskItem from "../components/TaskItem.jsx";

const API = "https://jsonplaceholder.typicode.com/todos";

const FILTERS = [
  { id: "all", label: "Усі" },
  { id: "active", label: "Активні" },
  { id: "completed", label: "Виконані" },
];

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [filter, setFilter] = useState("all");
  const [pending, setPending] = useState([]);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch(`${API}?userId=${user.id}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }
        setError("Не вдалося завантажити завдання. Перевірте з'єднання.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [user.id, attempt]);

  async function handleToggle(task) {
    const completed = !task.completed;
    setActionError("");
    setPending((ids) => [...ids, task.id]);
    try {
      const response = await fetch(`${API}/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setTasks((items) =>
        items.map((item) => (item.id === task.id ? { ...item, completed } : item))
      );
    } catch {
      setActionError("Не вдалося змінити статус завдання. Спробуйте ще раз.");
    } finally {
      setPending((ids) => ids.filter((id) => id !== task.id));
    }
  }

  const total = tasks.length;
  const done = tasks.filter((task) => task.completed).length;
  const left = total - done;

  const visible = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (loading) {
    return <p className="card status">Завантаження…</p>;
  }

  if (error) {
    return (
      <div className="card status">
        <p className="alert">{error}</p>
        <button className="btn btn-primary" onClick={() => setAttempt((n) => n + 1)}>
          Спробувати знову
        </button>
      </div>
    );
  }

  return (
    <section className="card">
      <h1>Мої завдання</h1>
      <p className="stats">
        Усього: {total} | Виконано: {done} | Залишилося: {left}
      </p>
      <div className="filters">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            className={filter === item.id ? "chip active" : "chip"}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {actionError && <p className="alert">{actionError}</p>}
      {visible.length === 0 ? (
        <p className="muted">Завдань немає.</p>
      ) : (
        <ul className="tasks">
          {visible.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              busy={pending.includes(task.id)}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
