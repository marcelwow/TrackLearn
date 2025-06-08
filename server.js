const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const app = express();
const port = 4000;

// Połączenie z MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://marcelekwaw:marcel1234@cluster0.86jxk9y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
}).then(() => console.log("✅ Połączono z MongoDB Atlas"))
    .catch(err => {
        console.error("❌ Błąd połączenia z MongoDB Atlas:", err);
        process.exit(1);
    });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'tracklearn-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // ustaw na true jeśli używasz HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 godziny
    }
}));
app.set("view engine", "ejs");

// Middleware do sprawdzania autoryzacji
const isAuthenticated = (req, res, next) => {
    console.log('Sprawdzanie autoryzacji, userId:', req.session.userId);
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// Middleware do sprawdzania czy użytkownik jest zalogowany
const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    next();
};

// Importowanie routerów
const subjectRoutes = require("./routes/subjectRoutes");
const authRoutes = require("./routes/authRoutes");

// Użycie routerów
app.use("/subjects", isAuthenticated, subjectRoutes);
app.use("/auth", authRoutes);

// Strony autoryzacji
app.get("/login", isLoggedIn, (req, res) => {
    res.render("login");
});

app.get("/register", isLoggedIn, (req, res) => {
    res.render("register");
});

// Strona główna
app.get("/", (req, res) => {
    res.render("home", {
        userId: req.session.userId,
        username: req.session.username
    });
});

// Wylogowanie
app.post("/logout", (req, res) => {
    // Czyszczenie wszystkich danych sesji
    req.session.userId = null;
    req.session.username = null;
    req.session.destroy((err) => {
        if(err) {
            console.error("Błąd podczas wylogowywania:", err);
            return res.status(500).send("Błąd podczas wylogowywania");
        }
        // Czyszczenie ciasteczka sesji
        res.clearCookie('connect.sid');
        // Przekierowanie do strony głównej z kodem 302 (temporary redirect)
        res.status(302).redirect("/");
    });
});

// Przekierowanie z /auth na główną stronę
app.get("/auth", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => console.log(`🚀 Serwer działa na http://localhost:${4000}`));
