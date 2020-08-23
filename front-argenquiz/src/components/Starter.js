import React from "react";

const Starter = ({
    amount,
    start,
    handleChange
}) => (
  <div>
      <input  onChange={e=>handleChange(e)} ></input>
         <button  onClick={start}>Jugar</button>
  </div>
);

export default Starter;
