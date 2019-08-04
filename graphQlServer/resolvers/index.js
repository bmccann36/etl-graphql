
const { mergeResolvers, fileLoader } = require('merge-graphql-schemas');
const path = require('path');

const resolversArray = fileLoader(path.join(__dirname, './'));

module.exports = mergeResolvers(resolversArray);


