const express = require('express');
const app = express();

require('dotenv').config();

// middleware
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('/public')
})
