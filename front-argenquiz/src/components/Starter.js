import React from "react";
const jugarButton = require("../images/jugar.png");
const jugarButtonPressed = require("../images/jugarPressed.png");

const Starter = ({ amount, start, handleChange, isPressed }) => (
  <div className="starterContainer">
    <div className="sliderContainer">
      <input
        id="slider"
        type="range"
        min="3"
        max="10"
        value={amount}
        onChange={(e) => handleChange(e)}
      ></input>

      <p id="amountIndicator">{amount}</p>
    </div>
    <input
      type="image"
      id="startButton"
      src={isPressed ? jugarButtonPressed : jugarButton}
      onClick={start}
    />
  </div>
);

export default Starter;
