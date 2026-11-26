const express = require("express"),
  app = express();
app.use(express.json());
app.use(express.static("public"));
let products = [{ id: 1, name: "Pen", price: 10, rating: 4.5 }],
  nextId = 2;
app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const { name, price, rating = 0 } = req.body;
  if (!name || price === undefined)
    return res.status(400).json({ error: "name and price required" });
  const p = {
    id: nextId++,
    name,
    price: Number(price),
    rating: Number(rating),
  };
  products.push(p);
  res.status(201).json(p);
});
app.listen(3000, () => console.log("Open http://localhost:3000"));
