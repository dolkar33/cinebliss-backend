const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register
const register = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne ({email});
    if (existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })
    await newUser.save();  // Save the user to the database

    res.status(201).json({message: 'User registered successfully'});

} catch (error) {
    res.status(500).json({message: 'Something went wrong'});
}
};

//Login

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Password is incorrect'});
        }

        //Create Token
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token, message: 'Login successful'});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
};

module.exports = {register, login}