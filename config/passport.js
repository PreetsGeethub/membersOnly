const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

// ⭐ Tell passport which fields to use
const customFields = {
  usernameField: "email",
  passwordField: "password"
};

const verifyCallback = async (email, password, done) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return done(null, false, { message: "User not found" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);

  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(customFields, verifyCallback));


// ⭐ Required for sessions

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE userid = $1",
      [id]
    );
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
