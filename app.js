const app = require('express')();
const cors = require('cors');
const { getProjects } = require('./controllers/projects-controller');
const { getLanguages } = require('./controllers/languages-controller');
const { psqlErrorHandler, serverErrorHandler } = require('./error-handlers');
const endpoints = require('./endpoints.json');

const allowedUrls = ['http://localhost:5173'];

/**************/
/* middleware */
/**************/

app.use(cors({ origin: allowedUrls }));
app.set('json spaces', 2);

/*************/
/* endpoints */
/*************/

// server info

app.get('/', (req, res, next) => {
  res.status(200).send('Server OK');
});

app.get('/api', (req, res, next) => {
  res.status(200).send(endpoints);
});

// projects

app.get('/api/projects', getProjects);

// languages

app.get('/api/languages', getLanguages);

/******************/
/* error handling */
/******************/

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'endpoint not found' });
});

app.use(psqlErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
