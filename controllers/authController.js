const authService = require('../services/authService');

exports.postRegister = async (req, res) => {
    const { email, password, rePass, course, classNum } = req.body;

    try {
        const result = await authService.register({ email, password, rePass, course, classNum });

        res.json(result);
    } catch (err) {
        res.status(401).json({ "Error": `${err.message}` });
    }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ "Error": `${err.message}` });
    }
};
