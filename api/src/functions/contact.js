const nodemailer = require("nodemailer")

require("dotenv").config()

module.exports = async function (context, req) {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    context.res = {
      status: 400,
      body: { message: "Please fill out all required fields." },
    }
    return
  }

  app.post("/", (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    })

    const mailOptions = {
      from: req.body.email,
      to: process.env.EMAIL,
      subject: "message from: " + req.body.email,
      message: req.body.message,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send(error.message)
      } else {
        res.send(info.response)
      }
    })
  })

  context.res = {
    status: 200,
    body: { message: "Thank you! Your message has been received." },
  }
}
