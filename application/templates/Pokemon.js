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
import { Button, Col, Container, Row } from "react-bootstrap";
import Banner from "../components/common/Banner";
import Filters from "../components/feature/Filters";
import PokemonList from "../components/feature/PokemonList";
import InfiniteScroll from "react-infinite-scroll-component";

let pokemonList = [];

const Pokemon = ({ types }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  console.log("Pokemon url", pokemonUrl);
  const { genders, males, females, genderless } = useSelector(
    (state) => state.pokemon
  );
  const { contextData } = useContext(PokemonContext);
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
    agent.pokemonApis.allPokemon(pokemonUrl).then((data) => {
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

  useEffect(() => {
    applyFilters();
  }, [contextData, pokemonList]);

  /**
   * @method To filter Pokemon Data
   *
   */
  const applyFilters = useCallback(() => {
    if (
      contextData.search !== "" ||
      contextData.types.length ||
      contextData.gender.length
    ) {
      const filteredArr = pokemonList.filter((item) => {
        return (
          (contextData.search !== ""
            ? item.name.indexOf(contextData.search) !== -1 ||
              item.id.toString().indexOf(contextData.search) !== -1
            : true) &&
          (contextData.types.length ? checkTypes(item) : true) &&
          (contextData.gender && contextData.gender.length
            ? checkGenders(item)
            : true)
        );
      });
      setPokemonData(filteredArr);
    } else {
      setPokemonData(pokemonList);
    }
  }, [pokemonData, contextData]);

  /**
   * @method To check existence of selected types
   * @param {*} item
   * @return {*}
   */

  const checkTypes = (item) => {
    let isExists = false;
    if (item && item.types.length) {
      item.types.forEach((val) => {
        if (
          contextData.types.indexOf(val.type.name) !== -1 ||
          contextData.types.indexOf(val.type.name) === 0
        ) {
          isExists = true;
          return;
        }
      });
      return isExists ? true : false;
    }
    return true;
  };

  /**
   * @method To check existence of selected genders
   * @param {*} item
   * @return {*}
   */

  const checkGenders = (val) => {
    let isExists = false;
    if (contextData.gender && contextData.gender.length) {
      contextData.gender.forEach((item) => {
        if (item === "male") {
          const index = males.indexOf(val.name);
          if (index !== -1) {
            isExists = true;
            return;
          }
        } else if (item === "female") {
          const index = females.indexOf(val.name);
          if (index !== -1) {
            isExists = true;
            return;
          }
        } else {
          const index = genderless.indexOf(val.name);
          if (index !== -1) {
            isExists = true;
            return;
          }
        }
      });
      return isExists ? true : false;
    }
    return true;
  };
  return (
    <Container>
      <Row className="mt-4 mb-4">
        <Col>
          <Banner />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <Filters type={types} gender={genders} />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <InfiniteScroll
            dataLength={pokemonData.length}
            next={getPokemons}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {pokemonData ? (
              <PokemonList
                data={pokemonData}
                male={males}
                female={females}
                genderless={genderless}
              />
            ) : (
              <h3>No Data Found</h3>
            )}
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
};

export default Pokemon;
