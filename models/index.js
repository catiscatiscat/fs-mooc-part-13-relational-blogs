const Blog = require('./blog');
const Session = require('./session');
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

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  Session,
  User,
  UserBlogs,
};
