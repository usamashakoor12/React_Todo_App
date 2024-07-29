import React from "react";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useEffect } from "react";

const TodoAdd = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditItem] = useState("");

  const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Please add your task.");
      return;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("TodoList", JSON.stringify(updatedTodoArr));

    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);

    localStorage.setItem("TodoList", JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
  };

  const handleCompleteTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let CompeletedOn = `${dd} - ${mm} - ${yyyy} at ${h} : ${m} : ${s}`;

    let filteredITem = {
      ...allTodos[index],
      CompeletedOn: CompeletedOn,
    };

    let updateCompletedArr = [...completedTodos];
    updateCompletedArr.push(filteredITem);
    setCompletedTodos(updateCompletedArr);
    localStorage.setItem("CompeletedTodos", JSON.stringify(updateCompletedArr));

    handleDeleteTodo(index);
  };

  const handleCompleteDeleteTodo = (index) => {
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index, 1);

    localStorage.setItem("CompeletedTodos", JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
  };

  const handleEdit = (ind) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditItem(allTodos[ind]);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdatedDescription = (value) => {
    setCurrentEditItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateTodo = () => {
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setAllTodos(newTodo);
    setCurrentEdit("");
  };

  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem("TodoList"));
    let savedCompeletedTodo = JSON.parse(
      localStorage.getItem("CompeletedTodos")
    );
    if (saveTodo) {
      setAllTodos(saveTodo);
    }

    if (savedCompeletedTodo) {
      setCompletedTodos(savedCompeletedTodo);
    }
  }, []);

  return (
    <>
      <div className="App">
        <h1>My Todos</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label htmlFor="">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                placeholder="What's the task"
              />
            </div>
            <div className="todo-input-item">
              <label htmlFor="">Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                placeholder="What's the description"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                onClick={handleAddTodo}
                className="primaryBtn"
              >
                Add
              </button>
            </div>
          </div>

          <div className="btn-arrea">
            <button
              className={`secodaryBtn ${isComplete === false && "active"}`}
              onClick={() => setIsComplete(false)}
            >
              Todo
            </button>
            <button
              className={`secodaryBtn ${isComplete === true && "active"}`}
              onClick={() => setIsComplete(true)}
            >
              Compeleted
            </button>
          </div>

          <div className="todo-list">
            {isComplete === false &&
              allTodos.map((items, index) => {
                if (currentEdit === index) {
                  return (
                    <div className="edit_wraper" key={index}>
                      <input
                        placeholder="Update Title"
                        onChange={(e) => handleUpdateTitle(e.target.value)}
                        value={currentEditedItem.title}
                      />
                      <textarea
                        placeholder="Update Title"
                        rows={4}
                        onChange={(e) =>
                          handleUpdatedDescription(e.target.value)
                        }
                        value={currentEditedItem.description}
                      />
                      <button
                        type="button"
                        onClick={handleUpdateTodo}
                        className="primaryBtn"
                      >
                        Update
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="todo-list-item">
                      <div>
                        <h3>{items.title}</h3>
                        <p>{items.description}</p>
                      </div>
                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleDeleteTodo(index)}
                          title="Delete?"
                        />
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleCompleteTodo(index)}
                          title="Compelete?"
                        />
                        <AiOutlineEdit
                          className="check-icon"
                          onClick={() => handleEdit(index)}
                          title="Edit?"
                        />
                      </div>
                    </div>
                  );
                }
              })}
            {isComplete === true &&
              completedTodos.map((items, index) => {
                if (currentEdit === index) {
                  <div className="edit_wraper">
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdatedDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                  </div>;
                } else {
                  return (
                    <div key={index} className="todo-list-item">
                      <div>
                        <h3>{items.title}</h3>
                        <p>{items.description}</p>
                        <p>
                          <small>Compeleted On : {items.CompeletedOn}</small>
                        </p>
                      </div>
                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleCompleteDeleteTodo(index)}
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoAdd;
