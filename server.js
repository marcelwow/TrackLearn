const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const config = require("./config");
const app = express();


mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
}).then(() => console.log("✅ Połączono z MongoDB Atlas"))
    .catch(err => {
        console.error("❌ Błąd połączenia z MongoDB Atlas:", err);
        process.exit(1);
    });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.set("view engine", "ejs");


const subjectRoutes = require("./routes/subjectRoutes");
const authRoutes = require("./routes/authRoutes");


const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect("/login");
};

const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect("/subjects");
    }
    next();
};


app.use("/subjects", isAuthenticated, subjectRoutes);
app.use("/auth", authRoutes);

app.get("/login", isLoggedIn, (req, res) => {
    res.render("login");
});

app.get("/register", isLoggedIn, (req, res) => {
    res.render("register");
});


app.get("/", (req, res) => {
    res.render("home", {
        userId: req.session.userId,
        username: req.session.username
    });
});


app.post("/logout", (req, res) => {

    req.session.userId = null;
    req.session.username = null;
    req.session.destroy((err) => {
        if(err) {
            console.error("Błąd podczas wylogowywania:", err);
            return res.status(500).send("Błąd podczas wylogowywania");
        }

        res.clearCookie('connect.sid');

        res.status(302).redirect("/");
    });
});

app.listen(config.PORT, () => console.log(`🚀 Serwer działa na http://localhost:${config.PORT}`));
