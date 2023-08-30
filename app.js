const app = require('express')();
const cors = require('cors');
const { getEndpointDetails } = require('./controllers/api-controller');
const { getProjects } = require('./controllers/projects-controller');
const { getLanguages } = require('./controllers/languages-controller');

const allowedUrls = ['http://localhost:5173'];

/**************/
/* middleware */
/**************/

app.use(cors({ origin: allowedUrls }));
app.set('json spaces', 2);

/*************/
/* endpoints */
/*************/

// server status

app.get('/', (req, res, next) => {
  res.status(200).send('Server OK');
});

// list endpoints

app.get('/api', getEndpointDetails);

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

module.exports = app;
