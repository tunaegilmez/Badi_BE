const { where } = require("sequelize");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { emailValidator } = require("../helper/validator");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      surname,
      email,
      username,
      password,
      profileImage,
      age,
      gender,
    } = req.body;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email && !emailValidator(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.update({
      name: name || user.name,
      surname: surname || user.surname,
      email: email || user.email,
      username: username || user.username,
      password: hashedPassword,
      profileImage: profileImage || user.profileImage,
      age: age || user.age,
      gender: gender || user.gender,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
