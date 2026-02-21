const pool = require('../db/pool')
require('dotenv').config();

async function joinClub(req,res) {
    const {passcode} = req.body;

    if(passcode === process.env.CLUB_PASSCODE){
        await pool.query(`
            UPDATE users 
            SET membershipStatus = 'member'
            WHERE userid = $1       
            `,[req.user.userid]);
    
            return res.redirect('/');
    }

        res.render('joinClub', { error: "Incorrect passcode" });
    }
    
    module.exports = { joinClub };

