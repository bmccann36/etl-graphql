
const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./typeDefs');

// Provide resolver functions for your schema fields
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

exports.main = server.createHandler();
