const express = require("express"),
  app = express();
app.use(express.json());
let products = [
    { id: 1, name: "Notebook", price: 50, description: "Ruled notebook" },
  ],
  nextId = 2;
app.get("/products", (req, res) => res.json(products));
app.get("/products/:id", (req, res) => {
  const p = products.find((x) => x.id === +req.params.id);
  p ? res.json(p) : res.status(404).json({ error: "Product not found" });
});
app.post("/products", (req, res) => {
  const { name, price, description = "" } = req.body;
  if (!name || price === undefined)
    return res.status(400).json({ error: "name and price are required" });
  const p = { id: nextId++, name, price: Number(price), description };
  products.push(p);
  res.status(201).json(p);
});
app.put("/products/:id", (req, res) => {
  const p = products.find((x) => x.id === +req.params.id);
  if (!p) return res.status(404).json({ error: "Product not found" });
  Object.assign(p, req.body, { id: p.id });
  res.json(p);
});
app.delete("/products/:id", (req, res) => {
  const old = products.length;
  products = products.filter((x) => x.id !== +req.params.id);
  res.sendStatus(old === products.length ? 404 : 204);
});
app.listen(3000, () => console.log("API listening at http://localhost:3000"));
