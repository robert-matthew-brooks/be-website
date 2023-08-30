const languagesModel = require('../models/languages-model');

async function getLanguages(req, res, next) {
  const languages = await languagesModel.getLanguages();
  res.status(200).send({ languages });
}

module.exports = { getLanguages };
