const express = require('express');
const cors = require('cors');
const {
  getProjects,
  getProject,
} = require('./controllers/projects-controller');
const { getLanguages } = require('./controllers/languages-controller');
const { getVotes, putVotes } = require('./controllers/votes-controller');
const {
  customErrorHandler,
  psqlErrorHandler,
  serverErrorHandler,
} = require('./error-handlers');
const endpoints = require('./endpoints.json');

const allowedUrls = [
  'http://localhost:5173', // react local
  'http://localhost:8888', // netlify serverless local
  'https://robert-matthew-brooks.netlify.app',
];

/*********************/
/* init / middleware */
/*********************/

const app = express();
//app.use(cors({ origin: allowedUrls }));
app.use(cors());
app.use(express.json());
app.set('json spaces', 2);

/*************/
/* endpoints */
/*************/

// server info

app.get('/', (_req, res, _next) => {
  res.status(200).send('Server OK');
});

app.get('/api', (_req, res, _next) => {
  res.status(200).send(endpoints);
});

// projects

app.get('/api/projects', getProjects);
app.get('/api/projects/:project_slug', getProject);

// languages

app.get('/api/languages', getLanguages);

// votes ip addresses

app.get('/api/votes/:project_id', getVotes);
app.put('/api/votes/:project_id', putVotes);

/******************/
/* error handling */
/******************/

app.all('*', (req, res, _next) => {
  res.status(404).send({ msg: 'endpoint not found' });
});

app.use(customErrorHandler);
app.use(psqlErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
