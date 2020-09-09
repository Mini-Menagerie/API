const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const db = require('./config/db');

// Set up port
const port = process.env.PORT;

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up database connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we are connected'));

app.get('/', (req, res) => {
  res.send('Welcome to Web Service Mini Menagerie!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})