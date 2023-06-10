const { gql } = require('apollo-server-express');

const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
  }

  input CategoryInput {
    name: String!
  }

  type Query {
  category(id: ID!): Category
  categories: [Category!]!
}

type Mutation {
  createCategory(input: CategoryInput!): Category
}`;

module.exports = categorySchema;