import React from "react";
import classNames from "./ToolTip.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ToolTip = (props) => {
  const { description } = props;
  return (
    <div
      className={classNames.description}
      tabIndex="0"
      aria-label="Tooltip Content"
      role="tooltip"
    >
      <section className="position-relative" tabIndex="0">
        {description}
      </section>
      <span
        className={classNames.cross}
        onClick={props.close}
        tabIndex="0"
        aria-label="Close ToolTip"
      >
        <FontAwesomeIcon icon={faClose} />
      </span>
    </div>
  );
};

export default ToolTip;
