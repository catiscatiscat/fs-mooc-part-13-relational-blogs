const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { sequelize } = require('../models/blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author',
    order: [
      [sequelize.fn('SUM', sequelize.col('likes')), 'DESC'],
      [sequelize.fn('COUNT', sequelize.col('title')), 'DESC'],
      ['author', 'ASC'],
    ],
  });
  res.json(blogs);
});

module.exports = router;
