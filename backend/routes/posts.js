const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
    } catch (error) {
        res.json({message: err}); 
    }
});

router.post('/signup', async (req, res) => {
    const user = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedPost = await user.save();
        res.json(savedPost);
    } catch (error) {
        res.json({message: error}); 
    }
});

router.post('/login', async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
    } catch (error) {
        res.json({message: err}); 
    }
});

module.exports = router; 