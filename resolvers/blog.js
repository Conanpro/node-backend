module.exports = {
  author: async (blog, _, { models }) => {
    return await models.User.findById(blog.author);
  },

  favoritedBy: async (blog, _, { models }) => {
    return await models.User.find({ _id: { $in: blog.favoritedBy } });
  }
};
