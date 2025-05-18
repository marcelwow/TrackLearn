const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const port = 4000;

// Połączenie z MongoDB
mongoose.connect("mongodb://localhost:27017/tracklearn", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log(" Połączono z MongoDB"))
    .catch(err => console.error(" Błąd połączenia z MongoDB:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Importowanie routerów
const subjectRoutes = require("./routes/subjectRoutes");
app.use("/subjects", subjectRoutes);

// Strona główna
app.get("/", (req, res) => {
    res.render("home");
});

app.listen(port, () => console.log(`🚀 Serwer działa na http://localhost:${4000}`));
