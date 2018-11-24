module.exports = `
  type Player {
    name: String
    image: String
  }

  type Query {
    players: [Player]
  }
`;
