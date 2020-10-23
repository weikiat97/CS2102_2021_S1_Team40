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
    //also need to consider only those bids that are during the same time period
    async getRequiredCaretakers(maximum_price, pet_type, start_date, end_date) {
        let query = `SELECT username, advertised_price, start_date, end_date
                    FROM availabilities
                    WHERE start_date <= '${start_date}' AND end_date >= '${end_date}'
                            AND advertised_price <= ${maximum_price} AND pet_type = '${pet_type}'
                    EXCEPT 
                    SELECT  A.username, A.advertised_price, A.start_date, A.end_date
                    FROM    availabilities A, (SELECT  b1.caretaker_username
                                                FROM    bids b1
                                                WHERE   isSuccessful
                                                GROUP BY b1.caretaker_username
                                                HAVING CASE
                                                            WHEN b1.caretaker_username IN (SELECT * FROM fulltime_caretakers)
                                                            THEN COUNT(b1.caretaker_username) >= 5
                                                        ELSE CASE
                                                                WHEN (SELECT AVG(rating) FROM bids b2 WHERE b2.caretaker_username = b1.caretaker_username) >= 4
                                                                    THEN COUNT(b1.caretaker_username) >= 5
                                                                ELSE COUNT(b1.caretaker_username) >= 2
                                                                END
                                                            END) B
                    WHERE   A.username = B.caretaker_username AND A.start_date <= '${end_date}' AND A.end_date >= '${start_date}'`;
        const results = await this.pool.query(query);
        if (results.rows.length === 0) {
            return null;
        } else {
            console.log("query went right: " + JSON.stringify(results));
            return results.rows;
        }
    }

  async get() {
    let query = `SELECT username FROM ${this.table};`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getSingleCareTaker(username) {
    let query = `SELECT t.username, t.type FROM (
      SELECT username, 'fulltime' AS type FROM fulltime_caretakers
      UNION
      SELECT username, 'parttime' AS type FROM parttime_caretakers
  ) AS t WHERE t.username = '${username}'`;
    const result = await this.pool.query(query);
    console.log(result);
    if (result.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
        type: result.rows.map((r) => r.type),
      };
    }
  }

  async addNewCareTaker(username, password, role) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${username}', '${password}')
                        RETURNING username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return {
        username: username,
        type: role,
      };
    }
  }

  async getProfileInfo(username) {
    let query = `SELECT info.job_type, info.pet_days, CASE
                                            WHEN job_type = 'Full Time' THEN
                                                CASE WHEN pet_days > 60 THEN 3000 + excess_price
                                                ELSE 3000
                                                END
                                            WHEN job_type = 'Part Time' THEN 0.75 * total_price
                                            END AS salary
                    FROM (
                      SELECT * FROM (
                          SELECT CASE 
                            WHEN '${username}' IN (SELECT * FROM fulltime_caretakers) THEN 'Full Time'
                            WHEN '${username}' IN (SELECT * FROM parttime_caretakers) THEN 'Part Time'
                            END AS job_type
                      ) AS jt, (
                          SELECT sum(b1.end_date - b1.start_date) AS pet_days, sum(b1.price) AS total_price, CASE
                                                                                                        WHEN sum(b1.end_date - b1.start_date) > 60 THEN (
                                                                                                            SELECT sum(b2.price) FROM bids AS b2
                                                                                                            WHERE b2.caretaker_username = '${username}' 
                                                                                                              AND b2.start_date >= date_trunc('month', CURRENT_DATE) + INTERVAL '60 days'
                                                                                                              AND b2.end_date < NOW()
                                                                                                              AND b2.isSuccessful
                                                                                                        )
                                                                                                        ELSE 0
                                                                                                    END AS excess_price
                          FROM bids AS b1
                          WHERE b1.caretaker_username = '${username}' 
                          AND b1.start_date >= date_trunc('month', CURRENT_DATE)
                          AND b1.end_date < CURRENT_DATE
                          AND b1.isSuccessful
                      ) AS oi
                 ) AS info`;
    const results = await this.pool.query(query);
    let reviews_query = `SELECT petowner_username, pet_name, review, rating 
                            FROM bids 
                            WHERE isSuccessful 
                            AND end_date < CURRENT_DATE
                            AND caretaker_username = '${username}'`;
    const reviews_results = await this.pool.query(reviews_query);
    let ongoing_query = `SELECT petowner_username, pet_name, start_date, end_date, price, transfer_method
                            FROM bids
                            WHERE isSuccessful
                            AND start_date <= CURRENT_DATE
                            AND end_date >= CURRENT_DATE
                            AND caretaker_username = '${username}'`;
    const ongoing_results = await this.pool.query(ongoing_query);
    let past_query = `SELECT petowner_username, pet_name, start_date, end_date, price, transfer_method
                            FROM bids
                            WHERE isSuccessful
                            AND end_date < CURRENT_DATE
                            AND caretaker_username = '${username}'`;
    const past_results = await this.pool.query(past_query);
    let avail_query = `SELECT start_date, end_date FROM availabilities 
                            WHERE username = '${username}' 
                            AND start_date >= CURRENT_DATE`;
    const avail_results = await this.pool.query(avail_query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return {
        ...results.rows[0],
        reviews: reviews_results.rows,
        ongoing: ongoing_results.rows,
        past: past_results.rows,
        availability: avail_results.rows,
      };
    }
  }
}

module.exports = new Caretaker();
