const router = require('express').Router();

const { UserBlogs } = require('../models');

router.post('/', async (req, res, next) => {
  const userBlogs = await UserBlogs.create(req.body);
  res.json(userBlogs);
});

module.exports = router;
