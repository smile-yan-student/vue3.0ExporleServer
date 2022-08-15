const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "Passenger",
});

const query = function (url, data) {
    return new Promise((resolve, reject) => {
        connection.query(url, function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
        });
    });
};

module.exports = { query };
// exports.query = query;
