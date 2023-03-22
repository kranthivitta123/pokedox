import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import PokemonItem from "./PokemonItem";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PokemonDetail from "./PokemonDetail";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../store";

const PokemonList = ({ data }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(filterActions.setModal(false));
  //const handleShow = () => setShow(true);
  const [selectedPokemon, setPokemon] = useState(null);
  const show = useSelector((state) => state.filterSlice.modal);

  /**
   * @author kranthi kumar reddy
   * @method To set pokemon data and show modal
   * @param {*} val
   */

  function selectedItem(val) {
    setPokemon(val);
    dispatch(filterActions.setModal(true));
  }

  return (
    <Fragment>
      <Row>
        {data.map((item) => {
          return (
            <Col key={item.id} xs={6} md={4} lg={2} className="mb-4">
              <PokemonItem
                pokemonItem={item}
                showPopUp={selectedItem.bind(null, item)}
              />
            </Col>
          );
        })}
      </Row>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-50w">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PokemonDetail data={selectedPokemon} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default PokemonList;
