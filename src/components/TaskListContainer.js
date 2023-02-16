import "./TaskListContainer.css";
import TaskList from "./TaskList";
import React, { useState } from "react";
// import { FaCheck, FaTimes, FaTrash, FaGripVertical } from "react-icons/fa";

function TaskListContainer({ tasks, deleteTask, toggleTaskStatus, setTasks }) {
  const openTasks = tasks.filter((task) => task.status === "open");
  const closedTasks = tasks.filter((task) => task.status === "closed");
  const [taskDragging, setTaskDragging] = useState(null);
  const [targetStatus, setTargetStatus] = useState(null);

  const handleToggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: task.status === "open" ? "closed" : "open" };
      }
      return task;
    });
    toggleTaskStatus(updatedTasks);
  };

  const handleDragStart = (event, task) => {
    setTaskDragging(task);
    event.dataTransfer.setData("text/plain", task.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setTargetStatus(null);
    setTaskDragging(null);
    const taskId = parseInt(event.dataTransfer.getData("text/plain"), 10);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId && targetStatus) {
        return { ...task, status: targetStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDragEnter = (event) => {
    const targetId = event.currentTarget.id;
    if (targetId === "openList") {
      setTargetStatus("open");
    } else if (targetId === "closedList") {
      setTargetStatus("closed");
    }
  };

  return (
    <div className="task-list-container">
      <>
        <TaskList
          id="openList"
          onDragEnter={handleDragEnter}
          tasks={openTasks}
          deleteTask={deleteTask}
          heading="Open Tasks"
          placeholderText="Add some tasks..."
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          handleToggleTaskStatus={handleToggleTaskStatus}
          taskDragging={taskDragging}
          dragTargetStyle={
            targetStatus === "open"
              ? { backgroundColor: "#A3A3A3" }
              : taskDragging
              ? { backgroundColor: "#CCC" }
              : {}
          }
        />
        <TaskList
          id="closedList"
          onDragEnter={handleDragEnter}
          tasks={closedTasks}
          deleteTask={deleteTask}
          heading="Closed Tasks"
          placeholderText="Closed tasks will appear here..."
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          handleToggleTaskStatus={handleToggleTaskStatus}
          taskDragging={taskDragging}
          dragTargetStyle={
            targetStatus === "closed"
              ? { backgroundColor: "#A3A3A3" }
              : taskDragging
              ? { backgroundColor: "#CCC" }
              : {}
          }
        />
      </>
    </div>
  );
}

export default TaskListContainer;
