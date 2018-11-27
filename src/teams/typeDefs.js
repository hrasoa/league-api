module.exports = `
  type Team {
    id: ID!
    name: String
    logo: String
  }

  type Query {
    teams: [Team]
    teamById(id: ID!): Team
  }
`;
