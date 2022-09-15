const router = require('express').Router();

const { UserBlogs } = require('../models');
const { checkAccess, tokenExtractor } = require('../util/middleware');

router.post('/', tokenExtractor, checkAccess, async (req, res, next) => {
  const userBlogs = await UserBlogs.create(req.body);
  res.json(userBlogs);
});

router.put('/:id', tokenExtractor, checkAccess, async (req, res, next) => {
  const userId = req.decodedToken.id;
  const blogId = req.params.id;
  const user_blogs = await UserBlogs.findOne({
    where: { user_id: userId, blog_id: blogId },
  });

  if (user_blogs) {
    user_blogs.read = req.body.read;
    await user_blogs.save();
    res.json(user_blogs);
  } else {
    res.status(404).end();
  }
});
module.exports = router;
