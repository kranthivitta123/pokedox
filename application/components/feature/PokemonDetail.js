import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import PokemonItem from "./PokemonItem";
import classNames from "./PokemonDetail.module.css";
import Chip from "./Chips";
import { ColorCodes } from "../common/ColourCodes";
import { Codes } from "../../utils/PokemonColours";
import ProgressBar from "../common/ProgressBar";
import { capitalize, prefixAdd, toFeet, trun } from "../../utils/Strings";
import ToolTip from "../common/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import PokemonContext from "@/application/context/PokemonContext";
import { getPokemonDescription } from "@/application/reducers/pokemon";

let codes = new ColorCodes(Codes);

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const PokemonContextData = useContext(PokemonContext);
  const types =
    props.data && props.data.types && props.data.types.length
      ? props.data.types.map((item) => capitalize(item.type.name))
      : [];

  const abilitie =
    props.data && props.data.abilities
      ? props.data.abilities.map((item) => capitalize(item.ability.name))
      : [];

  const { height, weight } = props.data;

  const [description, setDescription] = useState("");
  const [eggGroups, setEggGroups] = useState([]);
  const [weakness, setWeakness] = useState([]);
  const [showTool, setTool] = useState(false);
  const [abilities, setAbilities] = useState(abilitie);
  const { males, females, genderless } = useSelector((state) => state.pokemon);
  const [genderTypes, setGenderTypes] = useState([]);

  useEffect(() => {
    getDescription();
    getWeakAgainst(props.data.types);
    populateGenders();
  }, []);

  /**
   * @method To populate genders
   */

  const populateGenders = () => {
    let arr = [];
    const male1 = males.indexOf(props.data.name);
    if (male1 !== -1) arr.push("Male");
    const female1 = females.indexOf(props.data.name);
    if (female1 !== -1) arr.push("Female");
    const genderless1 = genderless.indexOf(props.data.name);
    if (genderless1 !== -1) arr.push("Genderless");
    setGenderTypes(arr);
  };

  /**
   * @method To get weekness
   * @param {*} data
   */

  const getWeakAgainst = (data) => {
    let arr = [];
    data.forEach(async (element) => {
      if (element) {
        const res = await fetch(element.type.url);
        const dataEach = await res.json();
        if (dataEach) {
          let week1 = dataEach.damage_relations.double_damage_from.map((item) =>
            capitalize(item.name)
          );
          let week2 =
            dataEach.damage_relations.half_damage_from &&
            dataEach.damage_relations.half_damage_from.length
              ? dataEach.damage_relations.half_damage_from.map((item) =>
                  capitalize(item.name)
                )
              : [];
          arr = [...arr, ...week1, ...week2];
          setWeakness([...new Set(arr)]);
        }
      }
    });
  };

  /**
   * @method To get description text
   *
   */

  const getDescription = () => {
    dispatch(getPokemonDescription(props.data.id))
      .unwrap()
      .then((data) => {
        getDescriptionText(data?.flavor_text_entries);
        getEggGroups(data?.egg_groups);
      });
  };

  /**
   * @method To get eggroups
   * @param {*} data
   */

  const getEggGroups = (data) => {
    if (data && data.length) {
      let arr = data.map((item) => capitalize(item.name));
      setEggGroups(arr);
    }
  };

  /**
   * @method To get description text by removing extra characters and duplicates
   * @param {*} data
   */

  const getDescriptionText = (data) => {
    if (data && data.length) {
      let arr;
      arr = data.map((item) => {
        if (item.language.name === "en")
          return item.flavor_text.replaceAll("\n", " ").replaceAll("\f", " ");
      });
      let newData;
      newData = [...new Set(arr)];
      setDescription(newData);
    }
  };

  return (
    <Fragment>
      <div className=" d-sm-block d-xs-block d-md-none">
        <div className="d-flex justify-content-between">
          <h3>{capitalize(props.data.name).toUpperCase()}</h3>
          <span
            className="pointer d-block"
            onClick={() => PokemonContextData.setModal(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </span>
        </div>
        <div>
          <h4 className="text-left">{prefixAdd(props.data.id)}</h4>
        </div>
      </div>
      <Row>
        <Col xs={6} md={4}>
          <PokemonItem pokemonItem={props.data} isRequired="true" />
        </Col>
        <Col xs={6} md={8} className={classNames.scroll}>
          <div className="d-none d-lg-block d-xl-block">
            <div className="row mb-4" tabIndex="0">
              <div className="col-6 col-md-6 col-lg-6 border-right">
                <h3>{capitalize(props.data.name).toUpperCase()}</h3>
              </div>
              <div className="col border-right">
                <h4 className="text-center">{prefixAdd(props.data.id)}</h4>
              </div>
              <div className="col text-center">
                <span
                  className="pointer"
                  onClick={() => PokemonContextData.setModal(false)}
                >
                  <FontAwesomeIcon icon={faClose} />
                </span>
              </div>
            </div>
          </div>
          <section tabIndex="0">
            {trun(description.toString(), 300)}
            <a href="#" onClick={() => setTool(true)}>
              Read more
            </a>
            {showTool ? (
              <ToolTip description={description} close={() => setTool(false)} />
            ) : null}
          </section>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={6} md={3} className="mt-2 mb-2">
          <div className={classNames.specs} tabIndex="0">
            <h3>Height</h3>
            <p>{toFeet((height / 10) * 100)}</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mt-2 mb-2">
          <div className={classNames.specs} tabIndex="0">
            <h3>Weight</h3>
            <p>{weight / 10} Kg</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mt-2 mb-2">
          <div className={classNames.specs} tabIndex="0">
            <h3>Genders</h3>
            <p>{genderTypes.join()}</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mt-2 mb-2">
          <div className={classNames.specs} tabIndex="0">
            <h3>Egg Groups</h3>
            <p>{eggGroups.join()}</p>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={6} md={3} className="mt-2 mb-4">
          <div className={classNames.specs} tabIndex="0">
            <h3>Abilities</h3>
            <p>{abilities.join()}</p>
          </div>
        </Col>
        <Col xs={6} md={3} className="mt-2 mb-4">
          <div className={classNames.specs} tabIndex="0">
            <h3>Types</h3>
            <div className="d-flex flex-wrap align-items-center">
              {types.map((item, index) => {
                return (
                  <Chip key={index} value={item} style={codes.getCode(item)} />
                );
              })}
            </div>
          </div>
        </Col>
        <Col xs={6} md={6} className="mt-2 mb-4">
          <div className={classNames.specs} tabIndex="0">
            <h3>Weak Against</h3>
            <div className="d-flex flex-wrap align-items-center">
              {weakness.map((item, index) => {
                return (
                  <Chip key={index} value={item} style={codes.getCode(item)} />
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
      <div className={classNames.stats} tabIndex="0">
        <h3 tabIndex="0">Stats</h3>
        <Row>
          {props.data.stats.map((item, index) => {
            return (
              <Col xs={12} md={6} key={index} className="mb-2">
                <Row tabIndex="0">
                  <Col xs={3}>
                    <h3 className={classNames.head}>
                      {capitalize(item.stat.name)}
                    </h3>
                  </Col>
                  <Col xs={9}>
                    <ProgressBar value={item.base_stat} />
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </div>
    </Fragment>
  );
};

export default PokemonDetail;
