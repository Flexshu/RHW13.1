import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="card narrow center">
      <h1>404</h1>
      <p>Сторінку не знайдено.</p>
      <Link className="btn btn-primary" to="/">
        На головну
      </Link>
    </section>
  );
}
