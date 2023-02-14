import "./App.css";
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const tasksFromLocalStorage = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    setTasks(tasksFromLocalStorage);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTasks = [...tasks, inputValue];
    updateTasks(newTasks);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    updateTasks(updatedTasks);
  };

  const updateTasks = (updatedTasks) => {
    console.log("props2 ", updatedTasks);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const clearTasks = () => {
    updateTasks([]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <button onClick={clearTasks}>Clear Tasks</button>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
