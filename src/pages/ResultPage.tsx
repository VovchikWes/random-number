import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

interface LocationState {
  number?: string;
  type?: string;
}

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { number, type } = (location.state as LocationState) || {};

  const [fact, setFact] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!number || !type) {
      navigate("/");
      return;
    }

    fetch(`http://numbersapi.com/${number}/${type}`)
      .then((res) => res.text())
      .then(setFact)
      .catch(() => setError("Ошибка загрузки данных"));
  }, [number, type, navigate]);

  return (
    <div className="page">
      <div className="result-box">
        <h1>Результат</h1>
        <p><strong>Тип:</strong> {type}</p>
        <p><strong>Число:</strong> {number}</p>
        <p><strong>Факт:</strong> {fact}</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={() => navigate("/")}>Назад</button>
      </div>
    </div>
  );
}

export default ResultPage;
