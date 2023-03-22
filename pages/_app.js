import PokemonProvider from "@/application/context/PokemonProvider";
import store from "@/application/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </PokemonProvider>
  );
}
