// custom errors

function customErrorHandler(err, req, res, next) {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
}

// psql errors

function psqlErrorHandler(err, req, res, next) {
  if (err.code === '42P01') {
    res.status(500).send({ msg: `undefined table` });
  } else if (err.code) {
    res.status(500).send({ msg: `unhandled psql error: ${err}` });
  } else next(err);
}

// catch-all

function serverErrorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send({ msg: `${err}` });
}

module.exports = { customErrorHandler, psqlErrorHandler, serverErrorHandler };
