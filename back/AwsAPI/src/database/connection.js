var knex = require("knex")({
    client:"mysql2",
    connection: {
        host: "localhost",
        port: "3306",
        user:"root",
        password:"",
        database:"db_api_aws"
    }
});

module.exports = knex;