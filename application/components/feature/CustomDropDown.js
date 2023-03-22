import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import MuiCheckBox from "../common/MuiCheckBox";
import "./CustomDropDown.css";
import { capitalize } from "../../utils/Strings";
import { useOutsideAlerter } from "../../hooks/outsideClick";

const CustomDropDown = (props) => {
  const [showPanel, setShowPanel] = useState(false);
  const { name } = props;
  const { selectedTypes } = props;
  const { selectedGenders } = props;
  const wrapperRef = useRef(name);
  const [outside] = useOutsideAlerter(wrapperRef);

  useEffect(() => {
    setShowPanel(false);
  }, [outside]);

  /**
   * @author kranthi kumar reddy
   * @method Check checked status
   * @param {*} val
   * @return {*}
   */
  const checkTypeSelection = (val) => {
    if (selectedTypes && selectedTypes.length) {
      return selectedTypes.indexOf(val) !== -1 ? true : false;
    }
    return false;
  };

  /**
   * @author kranthi kumar reddy
   * @method Check checked status
   * @param {*} val
   * @return {*}
   */

  const checkGenderSelection = (val) => {
    if (selectedGenders && selectedGenders.length) {
      return selectedGenders.indexOf(val) !== -1 ? true : false;
    }
    return false;
  };

  /**
   * @author kranthi kumar reddy
   * @method Change Dropdown changes
   * @param {*} val
   * @return {*}
   */

  const handleCheckbox = (item, status) => {
    if (props.name === "Type") {
      props.change("type", item.toLowerCase(), status);
    } else {
      props.change("gender", item.toLowerCase(), status);
    }
  };

  return (
    <div
      className={`dropdown pointer ${showPanel ? "white" : ""}`}
      tabIndex="0"
      aria-label="Checkbox Dropdown"
      role="Combobox"
      ref={wrapperRef}
    >
      {props.name === "Type" ? (
        <span className="d-block">
          {selectedTypes ? selectedTypes[0] : null}{" "}
          <span>
            {selectedTypes && selectedTypes.length
              ? `+ ${selectedTypes.length - 1} more`
              : props.name}
          </span>
        </span>
      ) : (
        <span className="d-block">
          {selectedGenders ? selectedGenders[0] : null}{" "}
          <span>
            {selectedGenders && selectedGenders.length
              ? `+ ${selectedGenders.length - 1} more`
              : props.name}
          </span>
        </span>
      )}

      <span
        className="d-block"
        tabIndex="0"
        role="button"
        aria-label={!showPanel ? "Expand Dropdown" : "Collapse Dropdown"}
      >
        <FontAwesomeIcon
          onClick={() => setShowPanel((val) => !val)}
          onKeyUp={() => setShowPanel((val) => !val)}
          icon={!showPanel ? faChevronDown : faChevronUp}
        />
      </span>
      {showPanel ? (
        <div className="drop-panel">
          <ul className="list-group list-group-flush">
            {props.values.map((item, index) => {
              return (
                <li className="list-group-item" key={index}>
                  <MuiCheckBox
                    isChecked={
                      props.name === "Type"
                        ? checkTypeSelection(item)
                        : checkGenderSelection(item)
                    }
                    label={capitalize(item)}
                    change={handleCheckbox}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDropDown;
