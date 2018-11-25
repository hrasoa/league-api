import { mergeSchemas } from 'graphql-tools';
import linkTypeDefs from './linkTypeDefs';
import playerSchema from './players';
import teamSchema from './teams';

export default mergeSchemas({
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
