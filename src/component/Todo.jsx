import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [isEdit, setIsEdit] = useState(null);

  function getLocalItems() {
    const list = localStorage.getItem("list");
    return list ? JSON.parse(list) : [];
  }

  const addItem = () => {
    if (!inputData) return;

    if (isEdit !== null) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === isEdit ? { ...item, name: inputData } : item
        )
      );
      setInputData("");
      setIsEdit(null);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newItem]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setInputData(itemToEdit.name);
      setIsEdit(id);
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <div className="min-h-screen bg-green-300 text-center flex justify-center items-center">
      <figure className="flex flex-col justify-center gap-y-2.5">
        <CalendarMonthIcon className="calender mx-auto text-red-400" />
        <figcaption className="text-red-500 font-medium text-2xl drop-shadow-2xl">
          Add your list here 👇
        </figcaption>
        <div className="flex justify-center bg-white py-1 px-3 mt-2.5 rounded-sm shadow-md">
          <input
            type="text"
            placeholder="Add Item..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="outline-none border-none italic "
          />
          {isEdit === null ? (
            <AddIcon onClick={addItem} />
          ) : (
            <BorderColorIcon onClick={addItem} className="cursor-pointer" />
          )}
        </div>
        <div className="show_item">
          {items.map((item) => (
            <div
              className="flex justify-between items-center capitalize py-0.5 px-2.5 rounded-sm font-medium bg-purple-600 text-white mt-3 shadow-md"
              key={item.id}
            >
              <h3 className="font-medium text-base">{item.name}</h3>
              <div className="todo_btn">
                <EditIcon
                  onClick={() => editItem(item.id)}
                  className="mr-2 hover:text-green-500 hover:cursor-pointer"
                />
                <DeleteForeverIcon
                  onClick={() => deleteItem(item.id)}
                  className="hover:text-red-500 hover:cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="show_item">
          <button
            className="flex items-center mx-auto mt-5 p-2.5 font-semibold border border-red-500 text-center outline-none rounded cursor-pointer hover:bg-red-500"
            onClick={removeAll}
          >
            <DeleteIcon /> Remove All
          </button>

          {/* <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={removeAll}
          >
            Remove All
          </Button> */}
        </div>
      </figure>
    </div>
  );
}

export default Todo;