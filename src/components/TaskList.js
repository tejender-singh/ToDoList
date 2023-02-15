import React from "react";

function TaskList({ tasks, deleteTask }) {
  const openTasks = tasks.filter((task) => task.status === "open");
  const closedTasks = tasks.filter((task) => task.status === "closed");

  return (
    <div>
      <h2>Open Tasks</h2>
      <ul>
        {openTasks.map((task, index) => (
          <li key={index}>
            {task.text}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Closed Tasks</h2>
      <ul>
        {closedTasks.map((task, index) => (
          <li key={index}>
            {task.text}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
