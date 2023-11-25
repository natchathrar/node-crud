
const { validationResult } = require('express-validator');
const User = require('./models');

// Validate user data before creating a new user
const validateUserData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json({ message: 'Create Successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users, message: 'Get all successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update
exports.updateUser = async (req, res) => {
    try {
        const { _id } = req.body; // Extract id from the request body
        console.log('Received update request for user with id:', _id);
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        );
        console.log('Updated User:', updatedUser);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


