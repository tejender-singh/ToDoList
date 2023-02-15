import "./TaskList.css";
import React from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

function TaskList({ tasks, deleteTask, toggleTaskStatus }) {
  const openTasks = tasks.filter((task) => task.status === "open");
  const closedTasks = tasks.filter((task) => task.status === "closed");

  const handleToggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: task.status === "open" ? "closed" : "open" };
      }
      return task;
    });
    toggleTaskStatus(updatedTasks);
  };

  return (
    <div className="task-list">
      <h2>Open Tasks</h2>
      {openTasks.length === 0 ? "Add some tasks..." : ""}
      <ul>
        {openTasks.map((task, index) => (
          <li key={index}>
            <p>{task.text}</p>
            <button
              title="Close task"
              onClick={() => handleToggleTaskStatus(task.id)}
            >
              <FaCheck />
            </button>
            <button title="Delete task" onClick={() => deleteTask(task.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <h2>Closed Tasks</h2>
      {closedTasks.length === 0 ? "Closed tasks will appear here..." : ""}
      <ul>
        {closedTasks.map((task, index) => (
          <li key={index}>
            <p>{task.text}</p>
            <button
              title="Reopen task"
              onClick={() => handleToggleTaskStatus(task.id)}
            >
              <FaTimes />
            </button>
            <button title="Delete task" onClick={() => deleteTask(task.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
