const express = require('express');
const cors = require("cors")
const app = express();
const nodemailer = require('nodemailer')
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://rossellamaruccia.github.io/diwhy/", // replace with your actual URL
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// middleware
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('/public')
})

app.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: 'message from: ' + req.body.email,
        message: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error.message)
        } else {
            res.send(info.response)
        }
    })
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})