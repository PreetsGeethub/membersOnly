const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("../db/pool");

const sessionMiddleware = session({
  store: new pgSession({
    pool: pool,
    tableName: "session" // table will be auto-created
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
});

module.exports = sessionMiddleware;
