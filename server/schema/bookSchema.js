const { gql } = require('apollo-server-express');

const bookSchema = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Book {
    id: ID!
    name: String!
    categories: [Category!]!
  }

  type BookPage {
    total: Int!
    books: [Book!]!
  }

  input BookInput {
    name: String!
    categoryIds: [ID!]!
  }

  type Query {
  book(id: ID!): Book
  books(search: String, categoryId: ID, limit: Int, offset: Int): BookPage
}

type Mutation {
  createBook(input: BookInput!): Book
  updateBook(id: ID!, name: String, categoryIds: [ID!]): Book
  deleteBook(id: ID!): Book
}`;

module.exports = bookSchema;