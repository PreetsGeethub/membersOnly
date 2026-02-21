const { Router } = require('express');
const router = Router();
const { getHome } = require('../controllers/indexController');

router.get('/', getHome);

module.exports = router;