const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { checkAccess, tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: '%' + req.query.search + '%',
          },
        },
        {
          author: {
            [Op.iLike]: '%' + req.query.search + '%',
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'username', 'name'],
    },
    where,
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, checkAccess, async (req, res, next) => {
  if (req.decodedToken && req.authUser) {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  }
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.delete(
  '/:id',
  tokenExtractor,
  checkAccess,
  blogFinder,
  async (req, res) => {
    if (req.blog && req.decodedToken && req.authUser) {
      if (req.blog.userId === null || req.blog.userId === req.decodedToken.id) {
        await req.blog.destroy();
      } else {
        res.status(403).json({ error: 'unauthorized' });
      }

      res.status(204).end();
    }
  }
);

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
