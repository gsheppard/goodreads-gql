/* - Glossery -
  Schema:
  A GraphQL schema is at the center of any GraphQL server implementation and
  describes the functionality available to the clients which connect to it.

  Scalar Type:
  A type that qualifies the data a GraphQL field resolves. GraphQL ships with
  some scalar types out of the box; Int, Float, String, Boolean and ID. However,
  a custom scalar type such as Date can be specified in a GraphQL service
  implementation.
*/
const { gql } = require('apollo-server');

const typeDefs = gql`
  """
    Schemas for data
  """
  type Author {
    id: String
    name: String
    books: [Book]
  }

  type Book {
    id: String
    title: String
    authorId: String
  }

  """
    - Glossery -
    Query:
    A read-only fetch operation to request data from a GraphQL service.

    All Query definitions go here. For example, a query for
      'author' would look like this:

    query GetAuthorById {
      author(id: 'author-111') {
        name
      }
    }

    Because our Author schema has 'books', which points to an array of 'Book',
    we can also query for the author's books:

    query GetAuthorById {
      author(id: 'author-111') {
        name
        books {
          title
        }
      }
    }
  """
  type Query {
    author(id: ID!): Author
  }
`;

module.exports = typeDefs;
