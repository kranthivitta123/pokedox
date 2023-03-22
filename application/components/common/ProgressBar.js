import React from "react";
import classNames from "./ProgressBar.module.css";

let val = 50;

const ProgressBar = (props) => {
  const style =
    props.value >= 100 ? { width: "100%" } : { width: `${props.value}%` };
  return (
    <div
      className={classNames.outer}
      aria-label={`Total stats ${props.value} of 100`}
    >
      <div className={classNames.inner} style={style}></div>
      <span className={classNames.value} value="value">
        {props.value}
      </span>
    </div>
  );
};

export default ProgressBar;
