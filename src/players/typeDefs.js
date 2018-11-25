export default `
  type Player {
    id: ID!
    team_id: ID
    name: String
    image: String
  }

  type Query {
    players: [Player]
    playerById(id: ID!): Player
  }
`;
