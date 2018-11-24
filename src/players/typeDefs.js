export default `
  type Player {
    id: ID!
    name: String
    image: String
  }

  type Query {
    players: [Player]
  }
`;
