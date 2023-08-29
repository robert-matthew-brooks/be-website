const endpoints = require('../endpoints.json');

function getEndpointDetails(req, res, next) {
  res.status(200).send(endpoints);
}

module.exports = { getEndpointDetails };
