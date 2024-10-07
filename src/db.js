const pg = require('pg');

const pool = new pg.Pool({
    user:"postgres",
    host: "localhost",
    password: "BuscoCurro.2024",
    database: "secretbooks",
    port: "5432"
});



module.exports = pool