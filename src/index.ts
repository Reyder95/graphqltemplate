import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import Schema from './schema';

const app = express();
const server = new ApolloServer({ schema: Schema });
server.applyMiddleware({ app });
app.listen(4000, () => {
  console.log("Server running on port 4000!");
});