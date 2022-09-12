const Blog = require('./blog');
const User = require('./user');
const UserBlogs = require('./user_blogs');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { as: 'readings', through: UserBlogs });
Blog.belongsToMany(User, { through: UserBlogs });
User.hasMany(UserBlogs);
UserBlogs.belongsTo(User);
Blog.hasMany(UserBlogs);
UserBlogs.belongsTo(Blog);

module.exports = {
  Blog,
  User,
  UserBlogs,
};
