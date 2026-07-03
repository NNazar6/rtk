import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Страница не найдена</h1>
      <h2>Ошибка: 404</h2>
      <button onClick={() => navigate("/")}>На главную</button>
    </div>
  );
}
