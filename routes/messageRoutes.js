const { Router } = require('express');
const router = Router();

const { isAuthenticated } = require('../middleware/authMiddleware');
const { createMessage, deleteMessage } = require('../controllers/messageController');


// ⭐ Create message page
router.get('/new', isAuthenticated, (req, res) => {
  res.render('createMessage');
});


// ⭐ Submit new message
router.post('/', isAuthenticated, createMessage);


// ⭐ Delete message (admin only)
router.post('/:id/delete', isAuthenticated, deleteMessage);


module.exports = router;