import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function HomePage() {
  const { isAuth } = useAuth();

  return (
    <section className="card hero">
      <h1>Ласкаво просимо до Task Cabinet</h1>
      <p>
        Особистий кабінет, де зібрані ваші завдання. Входьте, відмічайте виконане
        та фільтруйте список за статусом.
      </p>
      <Link className="btn btn-primary" to={isAuth ? "/my-tasks" : "/login"}>
        {isAuth ? "Відкрити завдання" : "Увійти"}
      </Link>
    </section>
  );
}
