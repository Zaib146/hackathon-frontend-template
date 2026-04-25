import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [plans, setPlans] = useState([]);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  async function fetchPlans() {
    const res = await fetch(`${API_URL}/study-plans`);
    const data = await res.json();
    setPlans(data);
  }

  async function createPlan(e) {
    e.preventDefault();

    await fetch(`${API_URL}/study-plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        description: "Created from frontend",
        difficulty,
        deadline: "2026-05-01",
        completed: false,
      }),
    });

    setTopic("");
    setDifficulty("Easy");
    fetchPlans();
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="container">
      <h1>Study Planner</h1>

      <form onSubmit={createPlan}>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
          required
        />

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button type="submit">Add Plan</button>
      </form>

      {plans.map((plan) => (
        <div className="card" key={plan.id}>
          <h3>{plan.topic}</h3>
          <p>{plan.description}</p>
          <p>Difficulty: {plan.difficulty}</p>
          <p>Deadline: {plan.deadline}</p>
        </div>
      ))}
    </div>
  );
}

export default App;