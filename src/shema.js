const { mergeSchemas } = require('graphql-tools');
const playerSchema = require('./players');

module.exports = mergeSchemas({
  schemas: [
    playerSchema,
  ],
});
