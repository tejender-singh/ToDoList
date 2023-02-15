import "./App.css";
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTasks([...tasks, { text: inputValue, status: "open" }]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={clearTasks}>Clear Tasks</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
