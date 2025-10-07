require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB connection error:", err));

// Quote model
const Quote = mongoose.model("Quote", new mongoose.Schema({
  author: String,
  text: String,
}));

// Routes
app.get('/', (req, res) => res.send("Quote Journal Backend Running ✅"));

// Get all quotes
app.get('/api/quotes', async (req, res) => {
  const quotes = await Quote.find().sort({ _id: -1 });
  res.json(quotes);
});

// Add new quote
app.post('/api/quotes', async (req, res) => {
  const quote = new Quote(req.body);
  await quote.save();
  res.json({ message: "Quote saved!", quote });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
