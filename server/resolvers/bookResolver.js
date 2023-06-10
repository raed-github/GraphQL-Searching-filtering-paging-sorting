const Book = require('../model/bookModel');
const Category = require('../model/categoryModel');

const bookResolver = {
  Query: {
    book: (parent, { id }) => {
      return Book.findById(id).populate('categories').exec();
    },
    books: async (parent, { search, categoryId, limit = 10, offset = 0 }) => {
      const filter = {};
      if (search) {
        filter.name = { $regex: search, $options: 'i' };
      }
      if (categoryId) {
        filter.categories = categoryId;
      }
      console.log(search)
      const books = await Book.find(filter)
        .skip(offset)
        .limit(limit)
        .populate('categories')
        .exec();
      const total = await Book.countDocuments(filter).exec(); // Return the count as a number
      return {
        books,
        total,
        limit,
        offset,
      };
    },
  },
    Mutation: {
    createBook: async (parent, { input }) => {
      const { name, categoryIds } = input;
        const categories = await Category.find({ _id: { $in: categoryIds } }).exec();
        const categoryRefs = categories.map((category) => category._id);
        const book = new Book({ name, categories: categoryRefs });
        await book.save();
        return book.populate('categories');
    },
    updateBook: async (parent, { id, name, categoryIds }) => {
      const book = await Book.findById(id).exec();
      if (!book) {
        throw new Error(`Book with id ${id} not found`);
      }
      if (name) {
        book.name = name;
      }
      if (categoryIds) {
        const categories = await Category.find({ _id: { $in: categoryIds } }).exec();
        const categoryRefs = categories.map((category) => category._id);
        book.categories = categoryRefs;
      }
      await book.save();
      return book.populate('categories');
    },
    deleteBook: (parent, { id }) => {
      return Book.findByIdAndDelete(id).exec();
    },
  },
};

module.exports = bookResolver;