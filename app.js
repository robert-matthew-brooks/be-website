const express = require('express');
const db = require('./db/connection.js');

const endpoints = require('./endpoints.json');

const app = express();
app.set('json spaces', 2);

app.get('/api', (req, res, next) => {
    res.status(200).send(endpoints);
});

app.get('/api/projects', async (req, res, next) => {
    const { rows } = await db.query('SELECT * FROM projects;');
    res.status(200).send(rows);
});

app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'endpoint not found' });
});

module.exports = app;