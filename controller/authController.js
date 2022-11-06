const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

//handle error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email:'', password:''};

// Incorrect email
if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
}

if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
}


// Duplicate errors code due to "Unique" requirement for email
if (err.code === 11000) {
    err.email + 'That email is already registered';
    return errors;
}

// Validation errors
if (err.message.includes('User validation failed')) {
    Object.value (err.errors).forEach (({ properties}) => {
        errors [ properties.path] = properties.message,
    });
}
return error;
}

const maxAge = 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, 'SECRET_TOKEN', {
        expiresIn: maxAge
    })
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await user.create({ email, password});
        const token = createToken(user._id)
        res.cookies('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.statu(201).json(user: user._id);
        
    } catch (error) {
        const errors = handleErrors(err);
        res.status(400).json({ errors});
        
    }
}

module.exports.login_post = async (rea, res) => {
    const (email, password ) = req.body;
    try {
        const user = await UserModel.login(email, passwaord);
        res.status(200).json({ user: user._id});
        res.cookies('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.statu(201).json({user: user._id});

    } 
    catch (error) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
    
}
