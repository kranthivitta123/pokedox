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
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const filters = useSelector((state) => state.filterSlice);
  const { contextData } = useContext(PokemonContext);
  console.log("PokemonContext", contextData);
  useEffect(() => {
    masterData();
  }, []);
  console.log("Store data", data);

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
      setPokemonUrl(data.next);
      getPokemonDetails(data.results);
    });
  }, [pokemonUrl]);

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
