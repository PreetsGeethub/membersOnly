const express = require('express');
const app = express();

const path = require('node:path');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionMiddleware = require("./config/session");
const passport = require("./config/passport");
const router = require('./routes/indexRoutes');

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// ⭐ MOVE THIS HERE (after passport.session)
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',router);
app.use('/', userRoutes);
app.use('/messages', messageRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The App is running on the port ${PORT}`);
});
