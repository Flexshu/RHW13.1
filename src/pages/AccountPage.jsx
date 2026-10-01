import { useAuth } from "../auth/AuthContext.jsx";

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <section className="card">
      <h1>Мій профіль</h1>
      <dl className="profile">
        <dt>Ім'я</dt>
        <dd>{user.name}</dd>
        <dt>Username</dt>
        <dd>{user.username}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>ID</dt>
        <dd>{user.id}</dd>
      </dl>
      <p className="muted">Ця сторінка доступна тільки після входу.</p>
    </section>
  );
}
