import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserTasks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="todo-wrapper">
      {data
        .filter((task) => task.completed)
        .slice(0, 3)
        .map((task) => (
          <div
            key={task.id}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <h3>{task.title}</h3>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          </div>
        ))}
      <Link to="/AddTask">
        <button className="secodaryBtn">Add Task</button>
      </Link>
    </div>
  );
};

export default UserTasks;
