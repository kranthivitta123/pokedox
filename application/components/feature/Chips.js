import React from "react";
import classNames from "./Chips.module.css";

const Chip = (props) => {
  const styleName = { background: "#" + props.style };
  const names = `d-block text-center ${classNames.chip}`;
  return (
    <span className={names} style={styleName} tabIndex="0">
      {props.value}
    </span>
  );
};

export default Chip;
