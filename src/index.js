const Hapi = require('@hapi/hapi');
const { ApolloServer } = require('apollo-server-hapi');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function start() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  const hapiServer = new Hapi.server({
    port: 4000,
    host: 'localhost',
  });

  await apolloServer.applyMiddleware({
    app: hapiServer,
  });

  await apolloServer.installSubscriptionHandlers(hapiServer.listener);

  await hapiServer.start();
  console.log('Server running on %s', hapiServer.info.uri);
  console.log('GraphQL UI running on %s', hapiServer.info.uri + apolloServer.graphqlPath)
}

start().catch(error => console.log(error));
