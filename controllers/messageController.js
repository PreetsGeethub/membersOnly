const pool = require('../db/pool');


// ⭐ Create message
async function createMessage(req, res) {
  const { title, text } = req.body;

  await pool.query(
    `INSERT INTO messages (title, text, userid)
     VALUES ($1, $2, $3)`,
    [title, text, req.user.userid]
  );

  res.redirect('/');
}


// ⭐ Delete message (ADMIN ONLY)
async function deleteMessage(req, res) {

  // 🔐 Extra backend protection (important!)
  if (!req.user || !req.user.isadmin) {
    return res.status(403).send("Not authorized");
  }

  await pool.query(
    `DELETE FROM messages WHERE id = $1`,
    [req.params.id]
  );

  res.redirect('/');
}


module.exports = { createMessage, deleteMessage };