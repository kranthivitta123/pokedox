import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../reducers/pokemon";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      pokemon: pokemonSlice.reducer,
    },
    devTools: true,
    preloadedState,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  });
}

const store = makeStore();

export default store;
