const pool = require("../pools");

class CareTaker {
  constructor() {
    this.pool = pool;
    this.table = "caretakers"; 
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

  async getSingleCareTaker(username, password) {
    let query = `SELECT u.username, t.type FROM caretakers
        UNION
        SELECT username, 'petowner' AS type FROM petowners
    ) AS t JOIN ${this.table} u 
        ON t.username = u.username 
        AND u.username = '${username}'
        AND password = '${password}'`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
        type: results.rows.map((r) => r.type),
      };
    }
  }

  async addNewCareTaker(username, password) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${username}', '${password}')
                        RETURNING username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return results.rows[0];
    }
  }
}

module.exports = new CareTaker();
