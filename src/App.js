import "./styles.css";
import React, { useState } from "react";
import SideBar from "./sidebar";
export default function App() {
  const [circlelist, setCircleList] = useState([]);

  const changeColor = (index) => {
    let array = [...circlelist];
    console.log(array[index].color, "bbb");
    if (array[index].color == "white") array[index].color = "blue";
    if (array[index].color == "blue") array[index].color = "white";
    console.log(array[index].color, "aaa");

    setCircleList(array);
  };
  const addCicrl = () => {
    let array = [...circlelist];
    array.push({ color: "white" });
    setCircleList(array);
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          addCicrl();
        }}
      >
        Add
      </button>

      <SideBar />
    </div>
  );
}
