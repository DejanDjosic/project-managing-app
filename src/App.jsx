import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text) => {
    setProjectsState((prevState) => {
      const newTask = {
        text:text,
        projectId:prevState.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectsState((prevState)=>
    {
      return{
        ...prevState,
        tasks:prevState.tasks.filter((task)=>task.id!==id)
      }
    })
  };

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: id };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: undefined };
    });
  };

  const handleEditProject = (editedProject) => {}

  
  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject project={selectedProject} onEditProject={handleEditProject} onDeleteProject={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask}  tasks={projectsState.tasks}/>
  );

  if (projectsState.selectedProjectId === null)
    content = (
      <NewProject
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onAdd={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  else if (projectsState.selectedProjectId === undefined)
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
