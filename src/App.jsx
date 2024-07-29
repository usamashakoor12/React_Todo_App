import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserTasks from "./UserTasks";
import TodoAdd from "./TodoAdd";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserTasks />} />
          <Route path="/AddTask" element={<TodoAdd />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
