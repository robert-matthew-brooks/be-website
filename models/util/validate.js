const format = require('pg-format');
const db = require('../../db/connection');

function rejectIfNotNumber(values) {
  for (const key in values) {
    if (!/^[\d]+$/.test(values[key])) {
      return Promise.reject({ status: 400, msg: `invalid ${key}` });
    }
  }
}

function rejectIfLessThan(values, lowestValue) {
  for (const key in values) {
    if (values[key] < lowestValue) {
      return Promise.reject({ status: 400, msg: `invalid ${key}` });
    }
  }
}

async function rejectIfNotInTable(value, column, table) {
  const queryStr = format(
    `
      SELECT *
      FROM %s
      WHERE %s = $1;
    `,
    table,
    column
  );

  const { rows } = await db.query(queryStr, [value]);

  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `specified ${column} not found in ${table} table`,
    });
  }
}

const sortByGreenlist = ['created_at', 'title'];
const orderGreenlist = ['ASC', 'DESC'];

function rejectIfNotInGreenList(values, greenlist) {
  for (const key in values) {
    if (!greenlist.includes(values[key])) {
      return Promise.reject({ status: 400, msg: `invalid ${key}` });
    }
  }
}

module.exports = {
  rejectIfNotNumber,
  rejectIfLessThan,
  rejectIfNotInTable,
  sortByGreenlist,
  orderGreenlist,
  rejectIfNotInGreenList,
};
