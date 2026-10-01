import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function LoginPage() {
  const { isAuth, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from;
  const target = from ? from.pathname + from.search : "/account";

  if (isAuth) {
    return <Navigate to={target} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await login(email, password);
      if (!result.ok) {
        setError("Неправильний email або пароль.");
        setLoading(false);
      }
    } catch {
      setError("Мережева помилка. Перевірте з'єднання та спробуйте ще раз.");
      setLoading(false);
    }
  }

  return (
    <section className="card narrow">
      <h1>Вхід</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Sincere@april.biz"
            required
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="task123"
            required
          />
        </label>
        {error && <p className="alert">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Вхід…" : "Увійти"}
        </button>
      </form>
    </section>
  );
}
