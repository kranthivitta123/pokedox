import React, { useReducer } from "react";
import PropTypes from "prop-types";
import PokemonContext from "./PokemonContext";

/** @type {*} */
const initialState = {
  search: "",
  types: [],
  gender: [],
  males: [],
  females: [],
  genderless: [],
  modal: false,
};

/**
/**
 * Reducer to handle form data an
 * @param {*} [state=initialState] intial state
 * @param {*} action dispatch action
 * @return {*} updated state
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_TYPE":
      return {
        ...state,
        types: [...action.payload],
      };
    case "CHANGE_GENDER":
      return {
        ...state,
        gender: [...action.payload],
      };
    case "CHANGE_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "CHANGE_MALES":
      return {
        ...state,
        males: [...action.payload],
      };
    case "CHANGE_FEMALES":
      return {
        ...state,
        females: [...action.payload],
      };
    case "CHANGE_GENDERLESS":
      return {
        ...state,
        genderless: [...action.payload],
      };
    case "RESET":
      return { initialState };
    case "SETMODAL":
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return initialState;
  }
};
/**
 * Context provider
 * @return {*} context value
 */
const PokemonProvider = ({ children }) => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const context = {
    contextData: formState,
    changeTypes(data) {
      dispatch({ type: "CHANGE_TYPE", payload: data });
    },
    changeSearch(data) {
      dispatch({ type: "CHANGE_SEARCH", payload: data });
    },
    changeGender(data) {
      dispatch({ type: "CHANGE_GENDER", payload: data });
    },
    changeMales(data) {
      dispatch({ type: "CHANGE_MALES", payload: data });
    },
    changeFemales(data) {
      dispatch({ type: "CHANGE_FEMALES", payload: data });
    },
    changeGenderLess(data) {
      dispatch({ type: "CHANGE_GENDERLESS", payload: data });
    },
    reset() {
      dispatch({ type: "RESET"});
    },
    setModal(data) {
      dispatch({ type: "SETMODAL", payload: data });
    },
  };
  return (
    <PokemonContext.Provider value={context}>
      {children}
    </PokemonContext.Provider>
  );
};

PokemonProvider.propTypes = {
  children: PropTypes.node,
};

PokemonProvider.defaultProps = {
  children: {},
};

export default PokemonProvider;
