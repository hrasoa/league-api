import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import schema from './shema';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log('🚀  Server listening on port 4000'); // eslint-disable-line no-console
});
