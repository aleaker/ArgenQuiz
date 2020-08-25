import React from "react";
const jugarButton = require("../images/jugar.png");
const jugarButtonPressed = require("../images/jugarPressed.png");

const Starter = ({ amount, start, handleChange,isPressed }) => (
  <div className="starterContainer">
    <div className="sliderContainer">
      <input type="range" min="3" max="10" value={amount} onChange={(e) => handleChange(e)}></input>
    </div>
      <input type="image" className="startButton"  src={isPressed?jugarButtonPressed:jugarButton}  onClick={start}/>

  </div>
);

export default Starter;
