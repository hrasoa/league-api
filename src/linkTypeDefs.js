module.exports = `
  extend type Player {
    team: Team
  }

  extend type Team {
    players: [Player]
  }
`;
