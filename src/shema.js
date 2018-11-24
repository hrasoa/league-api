import { mergeSchemas } from 'graphql-tools';
import playerSchema from './players';

export default mergeSchemas({
  schemas: [
    playerSchema,
  ],
});
