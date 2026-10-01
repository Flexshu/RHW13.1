export default function TaskItem({ task, busy, onToggle }) {
  return (
    <li className={task.completed ? "task done" : "task"}>
      <div className="task-body">
        <span className="task-title">{task.title}</span>
        <span className={task.completed ? "badge badge-done" : "badge"}>
          {task.completed ? "Виконано" : "Не виконано"}
        </span>
      </div>
      <button
        className="btn btn-outline"
        disabled={busy}
        onClick={() => onToggle(task)}
      >
        {busy ? "Збереження…" : task.completed ? "Повернути" : "Виконати"}
      </button>
    </li>
  );
}
