const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sign = (u) => jwt.sign(
  { id: u._id, role: u.role },
  process.env.JWT_SECRET || "development-only-change-this-secret",
  { expiresIn: "7d" }
);

const publicUser = (u) => ({
  id: u._id, name: u.name, email: u.email, phone: u.phone, role: u.role,
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name?.trim() || !email?.trim() || !password)
      return res.status(400).json({ message: "Name, email aur password zaruri hain" });
    if (password.length < 8)
      return res.status(400).json({ message: "Password kam se kam 8 characters ka hona chahiye" });
    if (role && !["owner", "tenant"].includes(role))
      return res.status(400).json({ message: "Role owner ya tenant hona chahiye" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: "Email already registered hai" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: email.trim().toLowerCase(), password: hashed, phone, role });
    res.status(201).json({ token: sign(user), user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email aur password zaruri hain" });
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Email ya password galat hai" });

    res.json({ token: sign(user), user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
