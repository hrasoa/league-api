const players = [
  {
    id: 1,
    team_id: 1,
    name: 'Mats hummelsssssss',
    image: 'https://pbs.twimg.com/profile_images/976109234906640384/YQJK5Ilz_400x400.jpg',
    pos: 'cb',
  },
  {
    id: 2,
    team_id: 1,
    name: 'Manuel Neurrr',
    image: 'https://pbs.twimg.com/profile_images/888346166546640896/BlBK7f2j_400x400.jpg',
    pos: 'gk',
  },
  {
    id: 3,
    team_id: 2,
    name: 'Lionel Messi',
    image: 'https://specials-images.forbesimg.com/imageserve/5b1559ba31358e612fbb121f/416x416.jpg?background=000000&cropX1=193&cropX2=3062&cropY1=207&cropY2=3078',
    pos: 'av',
  },
  {
    id: 4,
    team_id: 3,
    name: 'Neymar Jr',
    image: 'https://pbs.twimg.com/profile_images/1024824376406024192/XWNBgfCX_400x400.jpg',
    pos: 'av',
  },
  {
    id: 5,
    team_id: 3,
    name: 'Kylian Mbappé',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZ6fs7zi2eQLC_ccqKO7q2a6yF5TuvmgwwWHs0j8Sj1xcdtDU',
    pos: 'av',
  },
];

module.exports = {
  Query: {
    players: () => players,
    playerById: (root, args) => {
      const player = players.filter(p => p.id === parseInt(args.id, 10));
      return player.length ? player[0] : null;
    },
  },
};
