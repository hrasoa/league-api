const teams = [
  {
    id: 1,
    name: 'FC Bayern Munich',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/440px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
  },
  {
    id: 2,
    name: 'FC Barcelona',
    logo: 'https://www.psdgold.com/timthumb.php?src=http://psdgold.com/uploaded_images/149270884886_fc_barcelona_logo_psd.png&h=300&w=300&q=100',
  },
  {
    id: 3,
    name: 'Paris Saint-Germain F.C',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
  },
];

module.exports = {
  Query: {
    teams: () => teams,
    teamById: (root, args) => {
      const team = teams.filter(t => t.id === parseInt(args.id, 10));
      return team.length ? team[0] : null;
    },
  },
};
