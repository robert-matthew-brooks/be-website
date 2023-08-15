const express = require('express');

const app = express();

const PORT = 9090;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`listening on port ${PORT}`);
    }
});

module.exports = app;