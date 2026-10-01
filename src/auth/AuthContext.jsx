import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "task-cabinet-user";
const PASSWORD = "task123";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback(async (email, password) => {
    if (password !== PASSWORD) {
      return { ok: false };
    }
    const response = await fetch(USERS_URL);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const users = await response.json();
    const found = users.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!found) {
      return { ok: false };
    }
    const nextUser = {
      id: found.id,
      name: found.name,
      username: found.username,
      email: found.email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuth: Boolean(user), login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
