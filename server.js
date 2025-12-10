const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to handle email sending
app.post("/send-email", async (req, res) => {
  const { email, chartImage } = req.body;
  console.log("Received email request for:");

  // Validate email and chart image
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  if (!chartImage) {
    return res.status(400).json({ error: "Chart image is required" });
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider (e.g., Gmail, Outlook)
      auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-email-password", // Replace with your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: "your-email@gmail.com", // Sender email
      to: email, // Recipient email
      subject: "Your Chart from Bucks2Bar",
      text: "Here is your chart!",
      attachments: [
        {
          filename: "chart.png",
          content: chartImage.split("base64,")[1],
          encoding: "base64",
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
