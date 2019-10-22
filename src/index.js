const fetch = require("node-fetch");
const {
  ApolloServer,
  gql
} = require("apollo-server");



// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql `
  # Comments in GraphQL are defined with the hash (#) symbol.

  enum characterStatus {
    Alive
    Dead
    unknown
  }
  type Character {
    name: String
    id: ID
    status:characterStatus
    episode:[String]
    gender:String
    url: String
    image: String

  }
  type Episodes{
    name: String
    id: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    characters:[Character]
    character(id:ID!):Character
    episodes: [Episodes]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    characters: () => fetchCharacters(),
    character: (parent,args) => {
      const {id} = args
      console.log(parent)
      return fetchCharacterById(id)
    },
    episodes:()=>fetchEpisodes()
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: "production"
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({
  url
}) => {
  console.log(`🚀  Server ready at ${url}`);
});



function fetchEpisodes() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/episode/")
    .then(res => res.json())
    .then(json => json.results);
}

function fetchEpisodeById(id) {
  return fetch("https://rickandmortyapi.com/api/episode/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchEpisodeByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharacters() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/character/")
    .then(res => res.json())
    .then(json => json.results);
}

function fetchCharacterById(id) {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/character/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharacterByUrl(url) {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}