import React, { useState } from "react";
import "./Home.css";
import { Button } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import DeletIcon from "@material-ui/icons/Delete";

const Home = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItems, setEditItems] = useState(null);

  const addItem = () => {
    if (!inputData) {
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === editItems) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData(" ");
      setEditItems(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData(" ");
    }
  };

  const deleteItem = (index) => {
    console.log("delete");
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEditItems(id);
  };

  const removeAll = () => {
    setItems([]);
  };

  const completeTodo = (elem) => {
    setItems(
      items.map((item) => {
        if (item.id === elem.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  return (
    <div className="container">
      <div className="main_container">
        <h5>TodoInput</h5>
        <form>
          <div className="top_container">
            <input
              type="text"
              placeholder="New Todo"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <Button onClick={addItem} className="top-btn" variant="primary">
                Add new Task
              </Button>
            ) : (
              <Button onClick={addItem} className="top-btn" variant="primary">
                Edit
              </Button>
            )}
          </div>
        </form>
        <div className="todo_list">
          <h5>TodoList</h5>
          <Button className="btn_all">All</Button>
          <Button className="btn_done">Done</Button>
          <Button className="btn_todo">Todo</Button>
          <div className="list">
            <ol>
              {items.map((elem) => {
                return (
                  <div className="todo">
                    <li className="item" key={elem.id}>
                      <h3>{elem.name}</h3>
                      <input
                        onChange={() => completeTodo(elem.id)}
                        className="checkbox"
                        type="checkbox"
                      ></input>
                      <EditIcon
                        onClick={() => editItem(elem.id)}
                        className="edit"
                      ></EditIcon>
                      <DeletIcon
                        onClick={() => deleteItem(elem.id)}
                        className="icon"
                      ></DeletIcon>
                    </li>
                  </div>
                );
              })}
            </ol>
          </div>
          <div className="bottom_button">
            <Button variant="danger" style={{ float: "left", width: "15vw" }}>
              Delete done tasks
            </Button>
            <Button
              onClick={removeAll}
              variant="danger"
              style={{ float: "right", width: "15vw" }}
            >
              Delete all tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
