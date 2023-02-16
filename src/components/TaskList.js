import "./TaskListContainer.css";
import React from "react";
import { FaCheck, FaTimes, FaTrash, FaGripVertical } from "react-icons/fa";

function TaskList({
  tasks,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleToggleTaskStatus,
  deleteTask,
  heading,
  placeholderText,
  taskDragging,
  dragTargetStyle,
  onDragEnter,
  id,
}) {
  // const taskStatus = tasks[0].status;
  return (
    <div
      style={dragTargetStyle}
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(event)}
      onDragEnter={onDragEnter}
      id={id}
    >
      <h2>{heading}</h2>
      {tasks.length === 0 ? placeholderText : ""}
      <div className="task-list">
        {tasks.map((task, index) => (
          <div
            className="task-list-item"
            style={taskDragging ? { border: "none" } : {}}
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, task)}
          >
            <FaGripVertical />
            <p>{task.text}</p>
            <button
              title={task.status === "open" ? "Close task" : "Reopen task"}
              onClick={() => handleToggleTaskStatus(task.id)}
            >
              {task.status === "open" ? <FaCheck /> : <FaTimes />}
            </button>
            <button title="Delete task" onClick={() => deleteTask(task.id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
