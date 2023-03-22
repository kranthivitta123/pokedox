import React from "react";
/** @type {*} */
const PokemonContext = React.createContext({
  contextData: {
    search: "",
    types: [],
    gender: [],
    males: [],
    females: [],
    genderless: [],
    modal: false,
  },
  changeTypes: () => {},
  changeSearch: () => {},
  changeGender: () => {},
  changeMales: () => {},
  changeFemales: () => {},
  changeGenderLess: () => {},
  reset: () => {},
  setModal: () => {},
});

export default PokemonContext;
