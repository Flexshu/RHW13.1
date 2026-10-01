import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

export default function AppLayout() {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="brand">Task Cabinet</span>
          <nav className="nav">
            <NavLink to="/" end className={linkClass}>
              Головна
            </NavLink>
            <NavLink to="/help" className={linkClass}>
              Допомога
            </NavLink>
            {isAuth ? (
              <>
                <NavLink to="/account" className={linkClass}>
                  Мій профіль
                </NavLink>
                <NavLink to="/my-tasks" className={linkClass}>
                  Мої завдання
                </NavLink>
                <button className="btn btn-ghost" onClick={handleLogout}>
                  Вийти
                </button>
              </>
            ) : (
              <NavLink to="/login" className={linkClass}>
                Увійти
              </NavLink>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
