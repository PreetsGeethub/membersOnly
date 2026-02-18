const express = require('express');
const app = express();

const path = require('node:path');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',userRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The App is running on the port ${PORT}`);
});
