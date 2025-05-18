const User = require('../models/User');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Próba logowania dla użytkownika:', username);

        const user = await User.findOne({ username });
        console.log('Znaleziony użytkownik:', user ? 'Tak' : 'Nie');

        if (!user) {
            return res.render('login', { error: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }

        const isMatch = await user.comparePassword(password);
        console.log('Hasło się zgadza:', isMatch ? 'Tak' : 'Nie');

        if (!isMatch) {
            return res.render('login', { error: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }

        req.session.userId = user._id;
        console.log('Sesja utworzona dla użytkownika:', user._id);
        res.redirect('/subjects');
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        res.render('login', { error: 'Wystąpił błąd podczas logowania' });
    }
};

exports.postRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Próba rejestracji użytkownika:', username);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Użytkownik już istnieje');
            return res.render('register', { error: 'Użytkownik o tej nazwie już istnieje' });
        }

        const user = new User({ username, password });
        await user.save();
        console.log('Nowy użytkownik zarejestrowany:', user._id);

        res.redirect('/login');
    } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
        res.render('register', { error: 'Wystąpił błąd podczas rejestracji' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};