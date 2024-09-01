const user = require("../models/user");
const nodemailer = require("nodemailer");

const form = async (req, res) => {
  const { fullname, email, phonenumber, message } = req.body;
  if (!fullname || !email || !phonenumber || !message) {
    return res.status(400).json({ msg: "all fields are required" });
  }
  if (fullname.length > 20) {
    return res
      .status(400)
      .json({ msg: "username cannot be more than 20 characters" });
  }
  if (phonenumber.length !== 10) {
    return res.status(400).json({ msg: "incorrect phone number" });
  }
  try {
    const newUser = await user.create({
      fullname,
      email,
      phonenumber,
      message,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: ` Contact Form Submission from ${fullname}`,

      text: `Name:${fullname}\nEmail:${email}\nMobile:${phonenumber}\n\nMessage:\n${message}`,
      replyTo: email,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      return res
        .status(200)
        .json({ success: true, message: "Message sent successfully!" });
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports = { form };
