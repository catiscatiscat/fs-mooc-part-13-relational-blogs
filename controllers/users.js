const router = require('express').Router();

const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

router.post('/', async (req, res, next) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'marked_blogs',
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      through: {
        attributes: [],
      },
    },
  });
  if (user) {
    res.json({
      name: user.name,
      username: user.username,
      readings: user.marked_blogs,
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
