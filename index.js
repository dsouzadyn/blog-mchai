const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const quotesRouter = require('./services/quotes');

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Nothing to see here!'))
app.use('/api', quotesRouter);
app.listen(3000, () => console.log('App listening on port 3000!'))

module.exports = app;
