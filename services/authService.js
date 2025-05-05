const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const User = require('../models/User');
const { SECRET } = require('../config');

exports.findOneByEmail = (email) => User.findOne({ email });
// exports.findById = (_userID) => User.findById(_userID);
// exports.findByIdAndDelete = (_userID) => User.findByIdAndDelete(_userID);

exports.register = async ({ email, password, rePass, course, classNum }) => {
    if (password !== rePass) {
        throw new Error('Повторна парола не съвпада с парола!')
    }
    
    if (password.trim().length < 5) {
        throw new Error('Паролата трябва да бъде поне 5 символа!')
    }
    
    const isExisting = await this.findOneByEmail(email);
    console.log('here');

    if (!!isExisting) {
        throw new Error('Невалиден имейл или парола!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({ email, password: hashedPassword, course, classNum });

        
        const payload = await this.login(email, password);

        return payload;
    } catch (err) {
        return err;
    }
}

exports.login = async (email, password) => {
    const user = await this.findOneByEmail(email);


    if (!user) {
        throw new Error('Невалиден имейл или парола!');
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
        throw new Error('Невалиден имейл или парола!');
    }

    const payload = {
        _userID: user?._id,
        email,
        'course': user?.course,
        'classNum': user?.classNum,
    };

    const accessToken = await jwt.sign(payload, SECRET);

    return {
        ...payload,
        accessToken
    };

}