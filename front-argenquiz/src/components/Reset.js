import React from "react";
const volverAJugarButton = require("../images/volverAJugar.png");

const Reset = ({reStart}) => 
<div>
<input
            type="image"
            id="volverAJugarButton"
            src={volverAJugarButton}
            onClick={reStart}
          />

</div>;

export default Reset;
