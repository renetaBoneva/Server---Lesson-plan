const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: [5, 'Имейлът трябва да бъде поне 5 символа!']
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true,
        minLength: [2, 'Предметът трябва да бъде поне 2 символа!']
    },
    classNum: {
        type: Number,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;