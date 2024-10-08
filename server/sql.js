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
  const query = values.reduce((q, v, i) =>{
    let vv = v;
    if (v instanceof Uint8Array) {
      vv = '[Uint8Array]';
    }
    return q.replace(`$${i + 1}`, vv);
  }, text);
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

async function getPrayRecord(date, title) {
  const type = 'furigana';
  try {
    const res = await pool.query(`SELECT ${type}
                                  FROM pray
                                  WHERE date = $1`, [date]);
    if (res.rowCount === 0) {
      return null;
    }
    if (title) {
      return res.rows[0][type][title];
    } else {
      return res.rows[0][type];
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
  }
}

async function saveAudio(date, title, audio) {
  try {
    const res = await pool.query(`
      INSERT INTO audio (date, title, audio)
      VALUES ($1, $2, $3) ON CONFLICT (date, title) 
      DO
      UPDATE SET audio = EXCLUDED.audio
    `, [date, title, audio]);
    console.log('Record inserted', res);
    return {status: 'ok'};
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
  }
}

async function getAudio(date, title) {
  try {
    const res = await pool.query(`
      SELECT audio
      FROM audio
      WHERE date = $1 AND title = $2
      limit 1
    `, [date, title]);
    console.log('Record inserted', res);
    return res.rows[0].audio;
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
  }
}

module.exports = {
  upsertPrayRecord,
  getPrayRecord,
  saveAudio,
  getAudio
}
