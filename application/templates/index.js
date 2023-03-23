import Template from "./Pokemon";
import agent from "../api";

/**
 * fetch & prepare data for the homepage.
 *
 * @returns {object} Next.js formatted page options
 */
const ServerSideProps = async function getServerSideProps() {
  const pokemonTypes = await agent.pokemonApis.allTypes();
  const types = pokemonTypes.results.map((val) => val.name);
  return {
    props: {
      types,
    },
  };
};

export { Template, ServerSideProps };
