const mysql=require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:'root',
    password:'RoHeHeVi-111',
    database:'airbnb',
});

module.exports = pool.promise();