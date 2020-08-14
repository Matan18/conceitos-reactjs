import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState('');
  const [linkNewProject, setLinkNewProject] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data)
    })
  }, [])
  async function handleAddRepository() {
    const value = techs.split(',');
    console.log(value);

    const response = await api.post('/repositories', {
      title: newProject,
      url: linkNewProject,
      techs: value
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
      <>
        <label >Project:</label>
        <input value={newProject} placeholder="Insira o nome do projeto" onChange={(e) => setNewProject(e.target.value)} />
      </>
      <br />

      <>
        <label >URL:</label>
        <input value={linkNewProject} placeholder="Insira o link do projeto" onChange={(e) => setLinkNewProject(e.target.value)} />
      </>
      <br />
      <>
        <label >Techs:</label>
        <input value={techs} placeholder="ReactJs, NodeJs, JavaScript" onChange={(e) => setTechs(e.target.value)} />
      </>

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
