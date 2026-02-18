const pool = require('../db/pool');

async function createUser(data) {
  return await pool.query(
    `INSERT INTO users(firstname, lastname, email, password, membershipStatus)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      'non-member'
    ]
  );
}

module.exports ={ createUser}
