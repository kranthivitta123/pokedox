import Image from "next/image";
import React from "react";
import { Codes } from "../../utils/PokemonColours";
import { capitalize, prefixAdd } from "../../utils/Strings";
import Card from "../common/Card";
import { ColorCodes } from "../common/ColourCodes";
import classNames from "./PokemonItem.module.css";

let codes = new ColorCodes(Codes);

const PokemonItem = (props) => {
  const types =
    props.pokemonItem &&
    props.pokemonItem.types &&
    props.pokemonItem.types.length
      ? props.pokemonItem.types.map((item) => item.type.name)
      : [];
  /**
   * @code To bind dynamic style
   * @param {*} data
   */

  const style = codes.getBackgroundColor(types);

  /**
   * @method To show pop up
   * @param {*} data
   */

  const popup = () => {
    props.showPopUp();
  };

  return (
    <Card style={style} onClick={!props.isRequired ? popup : null}>
      <div className="d-flex flex-column align-items-center">
        <div className="mb-4">
          <img
            src={props.pokemonItem.sprites.other.dream_world.front_default}
            alt={props.pokemonItem.name}
            className="d-block"
          />
        </div>
        {props.isRequired ? null : (
          <div className={classNames.details}>
            <h3>{capitalize(props.pokemonItem.name)}</h3>
            <p>{prefixAdd(props.pokemonItem.id)}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PokemonItem;
