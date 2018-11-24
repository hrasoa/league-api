export default `
  type Player {
    name: String
    image: String
  }

  type Query {
    players: [Player]
  }
`;
