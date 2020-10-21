const pool = require("../pools");

class Bid {
  constructor() {
    this.pool = pool;
    this.table = "bids";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async getUserBids(username) {
    console.log("heregirl");
    let query = `SELECT (petowner_username, pet_name, start_date, end_date, price, transfer_method) FROM ${this.table}
                    WHERE caretaker_username='${username}'
                    ORDER BY start_date ASC`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async acceptBid(petowner_username, pet_name, caretaker_username, start_date, end_date) {
    let query = `UPDATE ${this.table} SET isSuccessful = true
                  WHERE petowner_username = '${petowner_username}' AND pet_name = '${pet_name}' AND caretaker_username = '${caretaker_username}'
                      AND start_date = '${start_date}' AND end_date = '${end_date}'
                  RETURNING petowner_username, pet_name, start_date, end_date, pet_type, price, transfer_method`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async declineBid(petowner_username, pet_name, caretaker_username, start_date, end_date) {
    let query = `UPDATE ${this.table} SET isSuccessful = false
                  WHERE petowner_username = '${petowner_username}' AND pet_name = '${pet_name}' AND caretaker_username = '${caretaker_username}'
                      AND start_date = '${start_date}' AND end_date = '${end_date}'
                  RETURNING petowner_username, pet_name, start_date, end_date, pet_type, price, transfer_method`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }
}

module.exports = new Bid();
