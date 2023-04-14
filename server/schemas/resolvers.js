const{User,Book} = require('../models');

const resolvers = {
  Query: {
    Users: async () => {
      return User.find();
    },
    User: async (parent, { _id }) => {
      return User.findOne({ _id: _id });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { userId, bookId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: bookId } },
        { new: true, runValidators: true }
      );
    },
    deleteBook: async (parent, { userId, bookId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId:bookId } } },
        { new: true }
      );
    }
  },
};

module.exports = resolvers;
