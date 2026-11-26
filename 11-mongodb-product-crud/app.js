require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  app = express();
app.use(express.json());
const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      description: { type: String, default: "" },
    },
    { timestamps: true },
  ),
);
app.get("/products", async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.post("/products", async (req, res) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    p ? res.json(p) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(400);
  }
});
app.put("/products/:id", async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    p ? res.json(p) : res.sendStatus(404);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    p ? res.sendStatus(204) : res.sendStatus(404);
  } catch (e) {
    res.sendStatus(400);
  }
});
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/labproducts")
  .then(() =>
    
    app.listen(3000, () => console.log("MongoDB API on http://localhost:3000")),
  )
  .catch((e) => {
    console.error("MongoDB connection failed:", e.message);
    process.exit(1);
  });
