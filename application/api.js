const API_ROOT = "https://pokeapi.co/api/v2";

function serialize(object) {
  const params = [];

  for (const param in object) {
    if (Object.hasOwnProperty.call(object, param) && object[param] != null) {
      params.push(`${param}=${encodeURIComponent(object[param])}`);
    }
  }

  return params.join("&");
}

const agent = async (url, body, method = "GET") => {
  const headers = new Headers();
  if (body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_ROOT}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let result;

  try {
    result = await response.json();
  } catch (error) {
    result = { errors: { [response.status]: [response.statusText] } };
  }

  if (!response.ok) throw result;

  return result;
};

const requests = {
  get: (url, query = {}) => {
    if (Number.isSafeInteger(query?.page)) {
      query.limit = query.limit ? query.limit : 10;
      query.offset = query.page * query.limit;
    }
    delete query.page;
    const isEmptyQuery = query == null || Object.keys(query).length === 0;

    return agent(isEmptyQuery ? url : `${url}?${serialize(query)}`);
  },
};

const pokemonApis = {
  allTypes: (query) => requests.get(`/type`, query),
  allFemales: (query) => requests.get("/gender/1/", query),
  allMales: (query) => requests.get("/gender/2/", query),
  allGenderless: (query) => requests.get("/gender/3/", query),
  allGenders: (query) => requests.get("/gender", query),
  allPokemon: (query) => requests.get("/pokemon", query),
  description: (id) => requests.get(`/pokemon-species/${id}`, {}),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pokemonApis,
};
