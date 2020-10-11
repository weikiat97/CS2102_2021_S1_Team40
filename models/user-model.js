const pool = require("../pools");

class User {
    constructor() {
        this.pool = pool;
        this.table = "users";
        this.pool.on(
            "error",
            (err, client) => `Error, ${err}, on idle client${client}`
        );
    }

    async get() {
        let query = `SELECT username FROM ${this.table}`;
        const results = await this.pool.query(query);
        return results.rows;
    }

    async getSingleUser(username, password) {
        let query = `SELECT username FROM ${this.table} 
                        WHERE username='${username}'
                        AND password='${password}'`;
        const results = await this.pool.query(query);
        if (results.rows.length !== 1) {
            return null;
        } else {
            return results.rows[0];
        }
    }

    async addNewUser(username, password) {
        let query = `INSERT INTO ${this.table}
                        VALUES ('${username}', '${password}')
                        RETURNING username`;
        const results = await this.pool.query(query);
        if (results.rows.length !== 1) {
            return null;
        } else {
            return results.rows[0];
        }
    }
}

module.exports = new User();