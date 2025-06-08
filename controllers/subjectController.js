const Subject = require("../models/Subject");

// Pobieranie wszystkich przedmiotów
exports.getSubjects = async (req, res) => {
    const subjects = await Subject.find({ userId: req.session.userId });
    res.render("subjects", {
        subjects,
        username: req.session.username
    });
};

// Dodawanie nowego przedmiotu
exports.addSubject = async (req, res) => {
    await new Subject({
        name: req.body.name,
        grades: [],
        userId: req.session.userId
    }).save();
    res.redirect("/subjects");
};

// Dodawanie oceny do przedmiotu
exports.addGrade = async (req, res) => {
    const subject = await Subject.findOne({
        _id: req.params.id,
        userId: req.session.userId
    });

    if (!subject) {
        return res.redirect("/subjects");
    }

    subject.grades.push(parseFloat(req.body.grade));
    await subject.save();
    res.redirect("/subjects");
};

// Usuwanie przedmiotu
exports.deleteSubject = async (req, res) => {
    await Subject.findOneAndDelete({
        _id: req.params.id,
        userId: req.session.userId
    });
    res.redirect("/subjects");
};

// Przeliczanie średniej ocen
exports.recalculateAverage = async (req, res) => {
    const subject = await Subject.findOne({
        _id: req.params.id,
        userId: req.session.userId
    });

    if (!subject) {
        return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
    }

    // Oblicz średnią
    const average = subject.calculateAverage();

    // Zwróć nową średnią
    res.json({ average });
};
