import React from "react";
import "./Chips.css";

const Chip = (props) => {
  const styleName = { background: "#" + props.style };
  return (
    <span className="d-block text-center chip" style={styleName} tabIndex="0">
      {props.value}
    </span>
  );
};

export default Chip;
