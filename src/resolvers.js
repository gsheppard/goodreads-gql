/* - Glossery -
  Resolver:
  A function that connects schema fields and types to various backends.
  Resolvers provide the instructions for turning a GraphQL operation into data.
  It can retrieve data from or write data to anywhere, including a SQL, No-SQL,
  or graph database, a micro-service, and a REST API. Resolvers can also return
  strings, ints, null, and other primitives.
*/
// const { authors, books } = require('./utils/sampleData');

const resolvers = {
  Query: {
    /*
      The `Query.author` resolver directly correlates to `Query.author` in our schema
    */
    author: async (parent, args, context, info) => {
      /*
        parent: An object that contains the result returned from the resolver on the parent type.
          In this case, because `Author` is a top-level schema, `parent` is undefined.
        args: The arguments passed in from the Query, as defined in the schema.
        context: An object shared by all resolvers in a GraphQL operation. We use the context to contain per-request state such as authentication information and access our data sources.
        info: Information about the execution state of the operation which should only be used in advanced cases
      */

      return context.dataSources.goodreadsApi.getAuthor(args.id);
    },
  },

  Author: {
    /*
      `Author.books` directly correlates to how Apollo should resolve when
      querying for `Author.books` from the schema. If `books` is not on the
      original data set, then Apollo will just return `null`.
    */
    books: async (parent, args, context, info) => {
      /*
        parent: In this case, `parent` is the `author` data.

        This could simply be rewritten as the following since we don't need the extra args:
          books: async (author) => {
      */
      return context.dataSources.goodreadsApi.getBooks(parent.id);
    },
  },
};

module.exports = resolvers;
