const express = require("express");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the correct views directory
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        message: "Welcome to the Home page"
    });
});

// About page
app.get("/about", (req, res) => {
    res.render("index", {
        title: "About",
        message: "This is the About page"
    });
});

// Contact page
app.get("/contact", (req, res) => {
    res.render("index", {
        title: "Contact",
        message: "This is the Contact page"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});