const router = require('express').Router();

const { Session } = require('../models');
const { checkAccess, tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, checkAccess, async (req, res) => {
  if (req.decodedToken && req.authUser) {
    await Session.destroy({ where: { userId: req.decodedToken.id } });

    res.status(200).send('Logout successful');
  }
});

module.exports = router;
