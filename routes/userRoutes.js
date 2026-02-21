const {Router} = require('express');
const userRoutes = Router();
const {createUserController} = require('../controllers/userControllers')
const {loginPost} = require('../controllers/authController')

const {isAuthenticated} = require('../middleware/authMiddleware')
const passport = require('../config/passport');
const { joinClub } = require('../controllers/membershipController');
const { createMessage } = require('../controllers/messageController');
userRoutes.get('/sign-up', (req, res) => {
    res.render('signup', { errors: [] });
  });
  

userRoutes.get('/',(req,res)=>{
  res.render('index')
})
userRoutes.post('/sign-up',createUserController);



userRoutes.get('/login', (req, res) => {
  res.render('login', { error: null });
});
userRoutes.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

userRoutes.post('/login',loginPost);
userRoutes.get('/logout', (req, res, next) => {

  req.logout(function(err) {
    if (err) { return next(err); }

    res.redirect('/');
  });

});


userRoutes.get('/join-club', isAuthenticated, (req, res) => {
  res.render('joinClub', { error: null });
});

userRoutes.post('/join-club',isAuthenticated,joinClub);

module.exports = userRoutes;