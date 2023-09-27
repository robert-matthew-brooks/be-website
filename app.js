const app = require('express')();
const cors = require('cors');
const {
  getProjects,
  getProject,
} = require('./controllers/projects-controller');
const { getLanguages } = require('./controllers/languages-controller');
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

/**************/
/* middleware */
/**************/

app.use(cors({ origin: allowedUrls }));
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
