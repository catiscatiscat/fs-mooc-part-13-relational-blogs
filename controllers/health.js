const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('ok').end();
});

module.exports = router;
