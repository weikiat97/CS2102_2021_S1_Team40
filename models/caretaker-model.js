const pool = require("../pools");

class Caretaker {
    constructor() {
        this.pool = pool;
        this.table = "caretakers";
        this.pool.on(
            "error",
            (err, client) => `Error, ${err}, on idle client${client}`
        );
    }

    async getRequiredCaretakers(maximum_price, pet_type, start_date, end_date) {
        let query = `SELECT username 
                    FROM ${availabilities}
                    WHERE start_date >= ${start_date} AND end_date <= ${end_date}
                    INTERSECT
                    SELECT  username
                    FROM    ${availabilities}
                    WHERE   price <= ${maximum_price} AND pet_type = ${pet_type}
                    INTERSECT
                    (SELECT username
                    FROM ${availabilities}
                    EXCEPT
                    SELECT  b1.username
                    FROM    bid b1
                    HAVING isSuccessful
                        AND CASE
                                WHEN b1.username IN (SELECT * FROM fulltime_caretakers)
                                    THEN count(b1.username) >= 5
                                ELSE CASE
                                        WHEN (SELECT avg(review) FROM bid b2 WHERE b2.username = b1.username) >= 4
                                            THEN count(b1.username) >= 5
                                        ELSE count(b1.username >= 2))`;
        const results = await this.pool.query(query);
        if (results.rows.length === 0) {
            return null;
        } else {
            return results.rows;
        }
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

module.exports = new Caretaker();
