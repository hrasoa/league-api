const { mergeSchemas } = require('graphql-tools');
const linkTypeDefs = require('./linkTypeDefs');
const playerSchema = require('./players');
const teamSchema = require('./teams');

module.exports = mergeSchemas({
  schemas: [
    playerSchema,
    teamSchema,
    linkTypeDefs,
  ],
  resolvers: {
    Player: {
      team: {
        fragment: '... on Player { team_id }',
        resolve(player, args, context, info) {
          return info.mergeInfo.delegateToSchema({
            schema: teamSchema,
            operation: 'query',
            fieldName: 'teamById',
            args: {
              id: player.team_id,
            },
            context,
            info,
          });
        },
      },
    },
  },
});
