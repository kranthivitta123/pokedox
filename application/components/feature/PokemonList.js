import React, { Fragment, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import PokemonItem from "./PokemonItem";
import { useState } from "react";
import PokemonContext from "@/application/context/PokemonContext";

const PokemonList = ({ data }) => {
  const PokemonContextData = useContext(PokemonContext);
  const handleClose = () => PokemonContextData?.setModal(false);
  //const handleShow = () => setShow(true);
  const [selectedPokemon, setPokemon] = useState(null);
  const show = PokemonContextData?.contextData?.modal;

  /**
   * @method To set pokemon data and show modal
   * @param {*} val
   */

  function selectedItem(val) {
    setPokemon(val);
    PokemonContextData.setModal(true);
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
    </Fragment>
  );
};

export default PokemonList;
