const {Router} = require('express');
const userRoutes = Router();
const {createUserController} = require('../controllers/userControllers')
userRoutes.get('/sign-up', (req, res) => {
    res.render('signup', { errors: [] });
  });
  
userRoutes.post('/sign-up',createUserController);


module.exports = userRoutes;