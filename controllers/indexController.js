const pool = require('../db/pool');

async function getHome(req, res) {

  const result = await pool.query(`
    SELECT messages.*, users.firstname, users.lastname
    FROM messages
    JOIN users ON messages.userid = users.userid
    ORDER BY messages.createdat DESC
  `);

  res.render('index', {
    messages: result.rows
  });
}

module.exports = { getHome };