import React, { Fragment, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../store";
import SearchBar from "../common/SearchBar";
import CustomDropDown from "./CustomDropDown";
import filterIcon from "../../assets/filter_icon.svg";
import Modal from "react-bootstrap/Modal";
import ExpansionPanel from "./ExpansionPanel";

const Filters = (props) => {
  const { type } = props;
  const dispatch = useDispatch();
  const handleSearch = (str) => {
    dispatch(filterActions.changeSearch(str));
  };
  const selectedTypes = useSelector((state) => state.filterSlice.types);
  const selectedGenders = useSelector((state) => state.filterSlice.gender);
  const selectedStr = useSelector((state) => state.filterSlice.search);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const reset = () => {
    dispatch(filterActions.reset());
    setShow(false);
  };

  /**
   * @author kranthi kumar reddy
   * @method Dispatch Filter changes
   * @param {*} type
   * @param {*} item
   * @param {*} status
   */

  const handleSelection = (type, item, status) => {
    if (type === "type") {
      const typesSelected = [...selectedTypes];
      status
        ? typesSelected.push(item)
        : typesSelected.splice(typesSelected.indexOf(item), 1);
      dispatch(filterActions.changeTypes(typesSelected));
    } else {
      const gendersSelected = [...selectedGenders];
      status
        ? gendersSelected.push(item)
        : gendersSelected.splice(gendersSelected.indexOf(item), 1);
      dispatch(filterActions.changeGender(gendersSelected));
    }
  };

  return (
    <Fragment>
      <Row className="align-items-center">
        <Col xs={10} md={6}>
          <label className="mb-0" htmlFor="search">
            Search by
          </label>
          <SearchBar click={handleSearch} />
        </Col>
        <Col
          xs={2}
          className="d-sm-block d-xs-block d-md-none"
          style={{ "marginTop": "20px" }}
        >
          <img
            src={filterIcon}
            className="filter pointer"
            alt="Filter"
            tabIndex="0"
            aria-label="Show Filters Dialog"
            onClick={() => setShow(true)}
          />
        </Col>
        <Col md={3} className="d-none d-lg-block d-md-block">
          <label className="mb-0">Type</label>
          <CustomDropDown
            name="Type"
            selectedTypes={selectedTypes}
            values={type}
            change={handleSelection}
          />
        </Col>
        <Col md={3} className="d-none d-lg-block d-md-block">
          <label className="mb-0">Gender</label>
          <CustomDropDown
            name="Gender"
            selectedGenders={selectedGenders}
            values={props.gender}
            change={handleSelection}
          />
        </Col>
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-50w"
          className="filter-modal"
        >
          <Modal.Header className="border-bottom">
            <Modal.Title>
              <h2>Filters</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <ExpansionPanel
                name="Type"
                selectedTypes={selectedTypes}
                values={type}
                change={handleSelection}
              />
            </div>
            <div className="mt-4">
              <ExpansionPanel
                name="Gender"
                selectedGenders={selectedGenders}
                values={props.gender}
                change={handleSelection}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className="flex-grow-1"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button
              variant="dark"
              className="flex-grow-1"
              onClick={() => setShow(false)}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Fragment>
  );
};

export default Filters;
