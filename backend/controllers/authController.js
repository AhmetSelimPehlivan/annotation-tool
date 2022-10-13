const User = require('../models/User');
const jwt = require("jsonwebtoken");

const createToken = (user_name, user_role, user_password) => {
    return jwt.sign({ name:user_name, role:user_role, password:user_password }, 
        process.env.JWTPRIVATEKEY, {
		expiresIn: "4h",});
};

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('/');
}

module.exports.login_get = (req, res) => {
    res.render('/');
}

module.exports.signup_post = async (req, res) => {
    try {
        if (await User.findOne({ email: req.body.email }))
            return res.status(409).send({ message: "!User with given email already Exist" });
        else if(await User.findOne({ email: req.body.user_name }))
            return res.status(409).send({ message: "!User with given User Name already Exist" });

        const user = await User.create({ ...req.body });
        const token = createToken(user.user_name, user.role, user.password);
        res.cookie('jwt', token, { httpOnly: true });
        res.cookie('isLogin', true, { httpOnly: true });
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.login_post = async (req, res) => {
    try {
        const user = await User.login(req.body.user_name, req.body.password);
        const token = createToken(user.user_name, user.role ,user.password);
        req.session.isAuth = true
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).send({ accessToken: token, message: "logged in successfully" });
    } catch (error) {
        if(error === "!Invalid Email or Password")
            res.status(401).send({ message: error });
        else
            res.status(500).send({ message: "Internal Server Error\n",error });
    }	
}

module.exports.logout_get = async (req, res) => {
    res.status(201).send({ message: "Successfully Logout" });
}