import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonFemale,
  getPokemonGenderless,
  getPokemonGenders,
  getPokemonMale,
} from "../reducers/pokemon";
import agent from "../api";
import PokemonContext from "../context/PokemonContext";

let pokemonList = [];

const Pokemon = ({ types }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [pokemonData, setPokemonData] = useState([]);
  const { genders, males, females, genderless } = useSelector(
    (state) => state.pokemon
  );
  const { contextData } = useContext(PokemonContext);
  console.log("PokemonContext", pokemonData);
  useEffect(() => {
    masterData();
  }, []);

  const masterData = () => {
    getPokemons();
    dispatch(getPokemonGenders());
    dispatch(getPokemonMale());
    dispatch(getPokemonFemale());
    dispatch(getPokemonGenderless());
  };
  /**
   * @method To get Pokemon List data
   */

  const getPokemons = useCallback(() => {
    agent.pokemonApis.allPokemon().then((data) => {
      getPokemonDetails(data.results);
    });
  }, []);

  /**
   * @method To Fetch Individual PokemonData
   * @param {*} data
   */

  const getPokemonDetails = (data) => {
    data.forEach(async (element) => {
      if (element) {
        const res = await fetch(element.url);
        const data = await res.json();
        pokemonList = [...pokemonList, data];
        setPokemonData((prev) => [...prev, data]);
      }
    });
  };
  return <div>Pokemon</div>;
};

export default Pokemon;
