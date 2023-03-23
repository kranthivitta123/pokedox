import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiCheckBox from "../common/MuiCheckBox";
import { capitalize } from "../../utils/Strings";

const ExpansionPanel = (props) => {
  const { selectedTypes } = props;
  const { selectedGenders } = props;

  /**
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
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {props.name === "Type" ? (
            <span className="d-block">
              {selectedTypes ? selectedTypes[0] : null}{" "}
              <b>
                {selectedTypes && selectedTypes.length
                  ? `+ ${selectedTypes.length - 1} more`
                  : props.name}
              </b>
            </span>
          ) : (
            <span className="d-block">
              {selectedGenders ? selectedGenders[0] : null}{" "}
              <b>
                {selectedGenders && selectedGenders.length
                  ? `+ ${selectedGenders.length - 1} more`
                  : props.name}
              </b>
            </span>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <ul className="list-group list-group-flush d-flex flex-row flex-wrap ">
            {props.values.map((item, index) => {
              return (
                <li className="list-group-item w-50 border-0" key={index}>
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ExpansionPanel;
