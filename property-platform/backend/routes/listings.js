const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Property = require("../models/Property");

router.get("/", async (_req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (e) {
    res.status(500).json({ message: "Listings load nahi ho sakin" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    if (!me) return res.status(401).json({ message: "User account nahi mila" });
    if (me.role !== "owner") return res.status(403).json({ message: "Sirf owner listing add kar sakte hain" });
    const { title, location, price, image, description, amenities } = req.body;
    if (!title?.trim() || !location?.trim() || !Number.isFinite(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({ message: "Valid title, location aur rent price zaruri hain" });
    }

    const property = await Property.create({
      title: title.trim(),
      location: location.trim(),
      price: Number(price),
      image,
      description,
      amenities,
      rating: 4.5,
      applied: false,
      owner: { name: me.name, phone: me.phone, email: me.email },
    });
    res.status(201).json(property);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
