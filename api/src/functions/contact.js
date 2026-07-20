const { app } = require("@azure/functions")
const nodemailer = require("nodemailer")


app.http("contact", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Processing contact form request for URL: "${request.url}"`)

    try {
      const body = await request.json()
      const { name, email, message } = body || {}

      if (!name || !email || !message) {
        return {
          status: 400,
          jsonBody: {
            message:
              "Please fill out all required fields (name, email, message).",
          },
        }
      }


      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL,
        replyTo: email,
        to: process.env.EMAIL,
        subject: `Message from: ${name} (${email})`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }

      const info = await transporter.sendMail(mailOptions)
      context.log("Email sent successfully:", info.response)

      return {
        status: 200,
        jsonBody: { message: "Thank you! Your message has been received." },
      }
    } catch (error) {
      context.error("Error sending email:", error)
      return {
        status: 500,
        jsonBody: { message: "Failed to send email.", error: error.message },
      }
    }
  },
})
