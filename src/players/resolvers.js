const players = [
  {
    id: 'player-1',
    team_id: '1',
    name: 'Mats Hummels',
    image:
      'https://pbs.twimg.com/profile_images/976109234906640384/YQJK5Ilz_400x400.jpg',
    pos: 'cb',
  },
  {
    id: 'player-2',
    team_id: '1',
    name: 'Manuel Neur',
    image:
      'https://pbs.twimg.com/profile_images/888346166546640896/BlBK7f2j_400x400.jpg',
    pos: 'gk',
  },
  {
    id: 'player-3',
    team_id: '2',
    name: 'Lionel Messi',
    image:
      'https://specials-images.forbesimg.com/imageserve/5b1559ba31358e612fbb121f/416x416.jpg?background=000000&cropX1=193&cropX2=3062&cropY1=207&cropY2=3078',
    pos: 'av',
  },
  {
    id: 'player-4',
    team_id: '3',
    name: 'Neymar Jr',
    image:
      'https://pbs.twimg.com/profile_images/1024824376406024192/XWNBgfCX_400x400.jpg',
    pos: 'av',
  },
  {
    id: 'player-5',
    team_id: '3',
    name: 'Kylian Mbappé',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZ6fs7zi2eQLC_ccqKO7q2a6yF5TuvmgwwWHs0j8Sj1xcdtDU',
    pos: 'av',
  },
  {
    id: 'player-6',
    team_id: '2',
    name: 'Andres Iniesta',
    image:
      'https://pbs.twimg.com/profile_images/1015425828748963840/dzi6cNGz_400x400.jpg',
    pos: 'mc',
  },
  {
    id: 'player-7',
    team_id: '2',
    name: 'Xavi Hernandèz',
    image:
      'https://pbs.twimg.com/profile_images/537989299242029056/iFIBMFj-_400x400.jpeg',
    pos: 'mc',
  },
  {
    id: 'player-8',
    team_id: '3',
    name: 'Edison Cavani',
    image:
      'https://pbs.twimg.com/profile_images/1019236288124334080/uH0t-voo_400x400.jpg',
    pos: 'bu',
  },
];

export default {
  Query: {
    players: (_, args) => {
      const cursorIndex = args.after
        ? players.findIndex(player => player.id === args.after) + 1
        : null;
      const data = players.slice(
        cursorIndex || 0,
        cursorIndex ? cursorIndex + args.first : players.length
      );
      return {
        edges: data.map(player => ({
          cursor: player.id,
          node: player,
        })),
        totalCount: data.length,
        pageInfo: {
          endCursor: data[data.length - 1].id,
          hasNextPage: true,
        },
      };
    },
    playerById: (_, args) => {
      const player = players.filter(p => p.id === args.id);
      return player.length ? player[0] : null;
    },
  },
};
