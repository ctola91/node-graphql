const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({
  schema: null,
});

server.listen().then(({ url }) => {
  console.log(`Server started in ${url}`);
});

