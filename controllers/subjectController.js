const Subject = require("../models/Subject");


exports.getSubjects = async (req, res) => {
    const subjects = await Subject.find({ userId: req.session.userId });
    res.render("subjects", {
        subjects,
        username: req.session.username
    });
};


exports.addSubject = async (req, res) => {
    await new Subject({
        name: req.body.name,
        grades: [],
        userId: req.session.userId
    }).save();
    res.redirect("/subjects");
};


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


exports.deleteSubject = async (req, res) => {
    await Subject.findOneAndDelete({
        _id: req.params.id,
        userId: req.session.userId
    });
    res.redirect("/subjects");
};

exports.recalculateAverage = async (req, res) => {
    const subject = await Subject.findOne({
        _id: req.params.id,
        userId: req.session.userId
    });

    if (!subject) {
        return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
    }


    const average = subject.calculateAverage();


    res.json({ average });
};

exports.togglePassed = async (req, res) => {
    const subject = await Subject.findOne({
        _id: req.params.id,
        userId: req.session.userId
    });

    if (!subject) {
        return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
    }

    subject.passed = !subject.passed;
    await subject.save();
    res.json({ passed: subject.passed });
};
