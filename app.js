const app = require('express')();
const cors = require('cors');
const apiController = require('./controllers/api-controller.js');
const projectsController = require('./controllers/projects-controller.js');

const allowedUrls = ['http://localhost:5173'];

// middleware

app.use(cors({ origin: allowedUrls }));
app.set('json spaces', 2);

// endpoints

app.get('/', (req, res, next) => {
  res.status(200).send('Server OK');
});

app.get('/api', apiController.getEndpointDetails);

app.get('/api/projects', projectsController.getProjects);

// error handling

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'endpoint not found' });
});

module.exports = app;
