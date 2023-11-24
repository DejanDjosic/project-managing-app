import React, { useState } from "react";
import Tasks from "./Tasks";
import Input from "./Input";

const SelectedProject = ({
  project,
  onEditProject,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
  tasks,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const [editedDescription, setEditedDescription] = useState(
    project.description
  );
  const [editedDueDate, setEditedDueDate] = useState(project.dueDate);

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const titleClasses = "text-3xl font-bold text-stone-600 mb-2";
  const dateClasses = "mb-4 text-stone-400";
  const descriptionClasses = "text-stone-600 whitespace-pre-wrap";

  const switchEditingHandler = () => {
    if (isEditing) setIsEditing(false);
    else {
      setIsEditing(true);
      setEditedTitle(project.title);
      setEditedDescription(project.description);
      setEditedDueDate(project.dueDate);
    }
  };

  const editProjectHandler = () => {
    const EditedProject = {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
      id: project.id,
    };
    onEditProject(EditedProject);
    switchEditingHandler();
  };

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          {!isEditing ? (
            <h1 className={titleClasses}>{project.title}</h1>
          ) : (
            <Input
              className={titleClasses}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              label="Title"
            />
          )}
          <div>
            {!isEditing && (
              <button
                className="text-stone-600 hover:text-stone-950"
                onClick={switchEditingHandler}
              >
                EDIT
              </button>
            )}
            <button
              className="ml-2 text-stone-600 hover:text-stone-950"
              onClick={onDeleteProject}
            >
              DELETE
            </button>
          </div>
        </div>
        {!isEditing ? (
          <p className={dateClasses}>{formattedDate}</p>
        ) : (
          <Input
            className={dateClasses}
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            label="Due Date"
          />
        )}
        {!isEditing ? (
          <p className={descriptionClasses}>{project.description}</p>
        ) : (
          <Input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            label="Descrption"
            textarea={true}
          />
        )}
        {isEditing&&<button
                className="ml-[31rem] text-stone-600 hover:text-stone-950"
                onClick={editProjectHandler}
              >
                FINISH EDITING
              </button>}
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
};

export default SelectedProject;
