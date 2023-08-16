const express = require('express');

const endpoints = require('./endpoints.json');

const app = express();
app.set('json spaces', 2);

app.get('/api', (req, res, next) => {
    res.status(200).send(endpoints);
});

app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'endpoint not found' });
});

module.exports = app;