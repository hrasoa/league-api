const players = [
  {
    id: 1,
    name: 'Mats hummels',
    image: 'https://pbs.twimg.com/profile_images/976109234906640384/YQJK5Ilz_400x400.jpg',
  },
  {
    id: 2,
    name: 'Manuel Neuer',
    image: 'https://pbs.twimg.com/profile_images/888346166546640896/BlBK7f2j_400x400.jpg',
  },
];

export default {
  Query: {
    players: () => players,
  },
};
