const pool = require("../pools");

class Caretaker {
    constructor() {
        this.pool = pool;
        this.table = "availabilities";
        this.pool.on(
            "error",
            (err, client) => `Error, ${err}, on idle client${client}`
        );
    }

    async getRequiredCaretakers(maximum_price, pet_type, start_date, end_date) {
        let query = `SELECT username 
                    FROM ${this.table}
                    WHERE start_date >= ${start_date} AND end_date <= ${end_date}
                    INTERSECT
                    SELECT  username
                    FROM    ${this.table}
                    WHERE   price <= ${maximum_price} AND pet_type = ${pet_type}
                    INTERSECT
                    (SELECT username
                    FROM ${this.table}
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
            return {
                username: username,
                type: results.rows.map((r) => r.type),
            };
        }
    }
}


module.exports = new Caretaker();
