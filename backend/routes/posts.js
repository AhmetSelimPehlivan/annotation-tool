const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

router.get('/', async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
    } catch (error) {
        res.json({message: err}); 
    }
});

router.post('/signup', async (req, res) => {
    try {
        if (await User.findOne({ email: req.body.email }))
            return res.status(409).send({ message: "!User with given email already Exist" });
        else if(await User.findOne({ email: req.body.user_name }))
            return res.status(409).send({ message: "!User with given User Name already Exist" });
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({...req.body, password: hashPassword}).save();
		res.status(201).send({ message: "User created successfully" });
    } catch (error) {
		res.status(500).send({ message: "!Internal Server Error\n",error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ user_name: req.body.user_name });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!user || !validPassword)
            return res.status(401).send({ message: "!Invalid Email or Password" });
        const token = user.generateAuthToken();
		res.status(200).send({ accessToken: token, message: "logged in successfully" });
    } catch (error) {
		res.status(500).send({ message: "Internal Server Error\n",error });
    }
});

module.exports = router; 