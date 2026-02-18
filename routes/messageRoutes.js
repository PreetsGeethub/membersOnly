const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/messages/new', isAuthenticated, (req, res) => {
  res.render('createMessage');
});

module.exports = router;
