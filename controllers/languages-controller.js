const languagesModel = require('../models/languages-model');

async function getLanguages(_req, res, next) {
  try {
    const languages = await languagesModel.getLanguages();
    res.status(200).send({ languages });
  } catch (err) {
    next(err);
  }
}

module.exports = { getLanguages };
