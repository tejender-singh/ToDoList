import "./App.css";
import React, { useState, useEffect } from "react";
import TaskListContainer from "./components/TaskListContainer";
import { MdAdd, MdClearAll } from "react-icons/md";

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
    if (inputValue) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        status: "open",
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const toggleTaskStatus = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <div className="card">
      <h1>Task Manager</h1>
      <form className="input-container" onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button title="Add task" type="submit">
          <MdAdd />
        </button>
        <button
          className="clear-button"
          title="Clear all tasks"
          onClick={clearTasks}
        >
          <MdClearAll />
        </button>
      </form>
      <TaskListContainer
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTaskStatus={toggleTaskStatus}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
