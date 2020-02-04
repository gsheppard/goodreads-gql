const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    id: String
    name: String
    books: [Book]
  }

  type Query {
    author(id: ID!): Author
  }
`;

module.exports = typeDefs;
