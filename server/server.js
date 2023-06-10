const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { logger, errorLogger } = require('./util/logger');
const { cachingMiddleware } = require('./util/cache');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const expressWinston = require('express-winston');
const bookResolver = require('./resolvers/bookResolver');
const categoryResolver = require('./resolvers/categoryResolver');
const bookSchema = require('./schema/bookSchema');
const categorySchema = require('./schema/categorySchema');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const app = express();
const port = 8888;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true });

// Merging the two schemas into a single schema
const mergedSchema = mergeTypeDefs([bookSchema, categorySchema]);
const schema = makeExecutableSchema({
  typeDefs: mergedSchema,
  resolvers: [bookResolver, categoryResolver],
});

// Add the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Add logging and auditing middleware
app.use(expressWinston.logger({ winstonInstance: logger }));
app.use(expressWinston.errorLogger({ winstonInstance: logger }));
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Add caching middleware
// app.use(cachingMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});