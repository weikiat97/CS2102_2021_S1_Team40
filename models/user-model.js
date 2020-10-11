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
        let query = `SELECT * FROM ${this.table}`;
        const results = await this.pool.query(query);
        return results.rows;
    }
}

module.exports = new User();