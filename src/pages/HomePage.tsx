import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [number, setNumber] = useState<string>("");
  const [type, setType] = useState<"trivia" | "math" | "date">("trivia");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (number && isNaN(Number(number))) {
      setError("Число должно быть в виде цифры");
      return;
    }
    setError("");
    navigate("/result", { state: { number, type } });
  };

  const handleRandom = () => {
    setError("");
    navigate("/result", { state: { number: "random", type } });
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as "trivia" | "math" | "date");
  };

  return (
    <div className="page">
      <div className="home-box">
        <h1>Узнай интересный факт о числе</h1>
        <input
          type="text"
          placeholder="Введите число"
          value={number}
          onChange={handleNumberChange}
        />
        <select value={type} onChange={handleTypeChange}>
          <option value="trivia">Trivia</option>
          <option value="math">Math</option>
          <option value="date">Date</option>
        </select>
        {error && <p>{error}</p>}
        <button onClick={handleSubmit}>Получить факт</button>
        <button onClick={handleRandom}>Рандом</button>
      </div>
    </div>
  );
};

export default HomePage;
