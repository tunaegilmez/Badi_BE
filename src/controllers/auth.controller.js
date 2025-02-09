const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { emailValidator } = require("../helper/validator");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

exports.register = async (req, res) => {
  try {
    const { name, surname, email, username, password } = req.body;

    if (emailValidator(email)) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser)
        return res.status(400).json({ error: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        surname,
        email,
        username,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User created", userId: user.id });
    } else {
      res.status(400).json({ error: "Lütfen doğru bir mail adresi giriniz." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const resetCodes = {};

exports.forgetPass = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    resetCodes[email] = {
      code: resetCode,
      expiresAt: Date.now() + 10 * 60 * 1000,
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}. This code will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset code sent to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPass = async (req, res) => {
  try {
    const { code, newPassword } = req.body;

    const email = Object.keys(resetCodes).find(
      (key) => resetCodes[key]?.code === code
    );

    if (!email)
      return res.status(400).json({ error: "Invalid or expired code" });

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete resetCodes[email];

    res.json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
