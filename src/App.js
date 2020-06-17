import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data)
    })
  }, [])
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Conceitos ReactJS`,
      url: "https://github.com/Matan18",
      techs: ["React", "Node.js", "Javascript"]
    })
    setProjects([...projects, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    if (response.status === 204) {
      setProjects(projects.filter(project => (project.id !== id)))
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => {
          if (project) {

            return (

              <li key={project.id}>
                {project.title}
                <button onClick={() => handleRemoveRepository(project.id)}>
                  Remover
          </button>
              </li>
            )
          }
          return <></>
        }
        )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
