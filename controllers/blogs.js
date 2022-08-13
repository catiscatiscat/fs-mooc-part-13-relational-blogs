const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
    }
    res.status(204).end();
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
