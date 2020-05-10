import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((results) => {
      setRepositories(results.data);
    });
  }, []);

  async function handleAddRepository() {
    const result = await api.post("/repositories", {
      title: "JavaScript",
      url: "https://github.com/perenciolo/js",
      techs: ["JavaScript"],
    });
    setRepositories([...repositories, result.data]);
  }

  async function handleRemoveRepository(id) {
    const newRepos = repositories.filter((item) => item.id !== id);
    setRepositories(newRepos);
    await api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
