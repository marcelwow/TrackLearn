const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    name: String,
    grades: [Number], // Tablica ocen
});

// Funkcja do obliczania średniej ocen
SubjectSchema.methods.calculateAverage = function() {
    if (this.grades.length === 0) return "Brak ocen";
    const sum = this.grades.reduce((a, b) => a + b, 0);
    return (sum / this.grades.length).toFixed(2);
};

module.exports = mongoose.model("Subject", SubjectSchema);
