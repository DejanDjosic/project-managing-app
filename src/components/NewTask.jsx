import React, { useState } from "react";

const NewTask = ({ onAdd }) => {
  const [enteredTask, setEnteredTask] = useState('');

  const handleChange = (e) => setEnteredTask(e.target.value);
  const handleClick = () => {
    if (enteredTask.trim() !== "") {
      onAdd(enteredTask);
      setEnteredTask("");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        onClick={handleClick}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
