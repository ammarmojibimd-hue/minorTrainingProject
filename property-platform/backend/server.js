const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Property = require('./models/Property');
const Application = require('./models/Application');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// naye auth aur listing routes (app ke baad hi aane chahiye)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/listings", require("./routes/listings"));

// ...yahan se niche aapke purane routes (/api/properties, /api/applications etc.) waise hi rahenge

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/properties', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const apps = await Application.find().populate('propertyId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));