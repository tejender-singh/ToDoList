import React from "react";

function TaskList(props) {
  console.log("props ", props.tasks);
  return (
    <>
      {props.tasks ? (
        <ul>
          {props.tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => props.deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}

export default TaskList;
