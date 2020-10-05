const pool = require('../pools');

class Pet {
  constructor() {
    this.pool = pool;
    this.table = 'pet';
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async get() {
    let query = `SELECT * FROM ${this.table}`;
    return this.pool.query(query).rows;
  }
}

module.exports = new Pet();