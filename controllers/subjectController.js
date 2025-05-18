const Subject = require("../models/Subject");

// Pobieranie wszystkich przedmiotów
exports.getSubjects = async (req, res) => {
    const subjects = await Subject.find();
    res.render("subjects", { subjects });
};

// Dodawanie nowego przedmiotu
exports.addSubject = async (req, res) => {
    await new Subject({ name: req.body.name, grades: [] }).save();
    res.redirect("/subjects");
};

// Dodawanie oceny do przedmiotu
exports.addGrade = async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    subject.grades.push(parseFloat(req.body.grade));
    await subject.save();
    res.redirect("/subjects");
};

// Usuwanie przedmiotu
exports.deleteSubject = async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.redirect("/subjects");
};

// Przeliczanie średniej ocen
exports.recalculateAverage = async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.redirect("/subjects");

    // Oblicz średnią
    const average = subject.calculateAverage();

    // Zwróć nową średnią
    res.json({ average });
};
