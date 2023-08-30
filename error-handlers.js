// custom errors

function customErrorHandler(err, req, res, next) {}

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
  res.status(500).send({ msg: `unhandled internal server error: ${err}` });
}

module.exports = { customErrorHandler, psqlErrorHandler, serverErrorHandler };
