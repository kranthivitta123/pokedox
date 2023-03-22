import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import agent from "../api";

export const getPokemonGenders = createAsyncThunk("pokemonGenders", () =>
  agent.pokemonApis.allGenders()
);

export const getPokemonMale = createAsyncThunk("pokemonMale", () =>
  agent.pokemonApis.allMales()
);

export const getPokemonFemale = createAsyncThunk("pokemonFemale", () =>
  agent.pokemonApis.allFemales()
);

export const getPokemonGenderless = createAsyncThunk("pokemonGenderless", () =>
  agent.pokemonApis.allGenderless()
);

const initialState = {
  genders: [],
  males: [],
  females: [],
  genderless: [],
};

const pokemonSlice = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    pokemonState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonGenders.fulfilled, (state, action) => {
      state.genders = action.payload.results;
    });
    builder.addCase(getPokemonMale.fulfilled, (state, action) => {
      if (action.payload && action.payload.pokemon_species_details.length) {
        let arr = action.payload.pokemon_species_details.map(
          (val) => val.pokemon_species.name
        );
        state.males = arr;
      }
    });
    builder.addCase(getPokemonFemale.fulfilled, (state, action) => {
      if (action.payload && action.payload.pokemon_species_details.length) {
        let arr = action.payload.pokemon_species_details.map(
          (val) => val.pokemon_species.name
        );
        state.females = arr;
      }
    });
    builder.addCase(getPokemonGenderless.fulfilled, (state, action) => {
      if (action.payload && action.payload.pokemon_species_details.length) {
        let arr = action.payload.pokemon_species_details.map(
          (val) => val.pokemon_species.name
        );
        state.genderless = arr;
      }
    });
  },
});

export default pokemonSlice;
