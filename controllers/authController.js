const passport = require('../config/passport');

function loginPost(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next);
}

module.exports = { loginPost };
