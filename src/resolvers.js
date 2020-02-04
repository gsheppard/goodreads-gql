// GS: These are kinda like Controllers
const { authors, books } = require('./utils/sampleData');

const resolvers = {
  Query: {
    author: async (parent, args, context, info) => {
      console.log('Query.author:', author, args, context, info)
      return authors.find((a => a.id === args.id));
    },
  },

  Author: {
    books: async (author, args, context, info) => {
      console.log('Author.book:', author, args, context, info)
      return books.filter(b => b.authorId === author.id);
    },
  },
};

module.exports = resolvers;
