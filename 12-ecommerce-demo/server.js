const express = require("express"),
  app = express();
app.use(express.json());
app.use(express.static("public"));
let products = [
    { id: 1, name: "T-shirt", price: 499, description: "Cotton T-shirt" },
    { id: 2, name: "Mug", price: 199, description: "Ceramic mug" },
  ],
  orders = [],
  nextId = 3;
app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const { name, price, description = "" } = req.body;
  if (!name || price === undefined)
    return res.status(400).json({ error: "name and price required" });
  const p = { id: nextId++, name, price: Number(price), description };
  products.push(p);
  res.status(201).json(p);
});
app.put("/api/products/:id", (req, res) => {
  const p = products.find((x) => x.id === +req.params.id);
  if (!p) return res.sendStatus(404);
  Object.assign(p, req.body, { id: p.id });
  res.json(p);
});
app.post("/api/orders", (req, res) => {
  const items = (req.body.items || [])
    .map((id) => products.find((p) => p.id === Number(id)))
    .filter(Boolean);
  if (!items.length) return res.status(400).json({ error: "Cart is empty" });
  const order = {
    id: Date.now(),
    items,
    total: items.reduce((sum, p) => sum + p.price, 0),
    status: "Demo order — no payment collected",
  };
  orders.push(order);
  res.status(201).json(order);
});
app.get("/api/orders", (req, res) => res.json(orders));
app.listen(3000, () => console.log("Open http://localhost:3000"));
