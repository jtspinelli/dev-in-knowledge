const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'images')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.log(`APP RUNNING ON PORT ${port}`);
});