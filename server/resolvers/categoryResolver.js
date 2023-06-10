const Category = require('../model/categoryModel');

const categoryResolver = {
  Query: {
    category: (parent, { id }) => {
      return Category.findById(id).exec();
    },
    categories: () => {
      return Category.find().exec();
    },
  },
  Mutation: {
    createCategory: async (parent, { input }) => {
      const { name } = input;
      const category = await Category.create({ name });
      return category;
    }
  }
};

module.exports = categoryResolver;