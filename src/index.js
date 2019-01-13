import app, { apolloServer } from './app';

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀  Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  ); // eslint-disable-line no-console
});
