import React from "react";

const Starter = ({ amount, start, handleChange }) => (
  <div>
      <input type="range" min="3" max="10" value={amount} onChange={(e) => handleChange(e)}></input>

    <button onClick={start}>Jugar</button>
  </div>
);

export default Starter;
