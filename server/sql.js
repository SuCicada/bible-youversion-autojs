// const { Client } = require('pg');
const {Pool} = require('pg');
const pg = require('pg');

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // 使用环境变量
});

const Query = require('pg').Query;
const submit = Query.prototype.submit;
Query.prototype.submit = function () {
  const text = this.text;
  const values = this.values;
  const query = values.reduce((q, v, i) => q.replace(`$${i + 1}`, v), text);
  console.log(query);
  submit.apply(this, arguments);
};

async function upsertPrayRecord(date, title, furigana) {

  try {
    const checkResult = await pool.query('SELECT 1 FROM pray WHERE date = $1', [date]);

    if (checkResult.rowCount === 0) {
      const res = await pool.query('INSERT INTO pray (date, furigana) VALUES ($1, $2)',
        [date, {[title]: furigana}]);
      console.log('Record inserted', res);

    } else {
      if (typeof furigana === 'string') {
        furigana = `"${furigana}"`
      }

      const res = await pool.query(`
        UPDATE pray
        SET furigana = jsonb_set(furigana, '{${title}}', $2::jsonb)
        WHERE date = $1
      `, [date, furigana]);
      console.log('Record updated', res);

    }
    return {status: 'ok'};
  } catch (err) {
    console.error('Error executing query', err.stack);
    return {status: 'error', message: err.message};
  }
}

async function getPrayRecord(date, type, title) {
  try {
    const res = await pool.query(`SELECT ${type}
                                  FROM pray
                                  WHERE date = $1`, [date]);
    if (res.rowCount === 0) {
      return null;
    }
    return res.rows[0][type][title];
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
  }
}

module.exports = {
  upsertPrayRecord,
  getPrayRecord
}
