const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const Task = require('../models/Task');

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('/');
}

module.exports.usersession_get = (req, res) => {
    try {
        if(req.session.role =="User")
            res.status(201).send({user_name: req.session.user_name, tasks: req.session.tasks, role: req.session.role, message: "User Access" });
        else
            res.status(500).send({ message: "!Acces Denied\n",error });
    } catch (error) {
        res.status(500).send({ message: "!Acces Denied\n",error });
    }
    if(req.session.role == "User")
        console.log("Hello User");
    else
        console.log("Acces Denied");
}

module.exports.userauth_get = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const user = await User.findOne({ refresh_token: refreshToken });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err || !user.user_name) return res.status(403).json({accessToken: undefined});
            const user_name = user.user_name;
            const accessToken = jwt.sign({user_name}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.status(200).json({ accessToken: accessToken });
        });
    } catch (error) {
        res.status(401).json({accessToken: undefined});
    }
}


module.exports.signup_post = async (req, res) => {
    try {
        if (await User.findOne({ email: req.body.email }))
            return res.status(409).send({ message: "!User with given email already Exist" });
        else if(await User.findOne({ user_name: req.body.user_name }))
            return res.status(409).send({ message: "!User with given User Name already Exist" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        let password = await bcrypt.hash(req.body.password, salt);
        const user = await User.save({
            user_name:  req.body.user_name,
            email: req.body.email,
            role: req.body.role,
            email: password,
        });
        
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.login_post = async (req, res) => {
    try {
        const user = await User.findOne({ user_name: req.body.user_name });
        const auth = await bcrypt.compare(req.body.password, user.password);
        
        if (!user || !auth)
            res.status(500).send({ message: "!Invalid Email or Password" });
        else if(auth){
            const userTasks = await Task.find({dedicated_user: req.body.user_name});
            const user_name = user.user_name
            ////
            req.session.user_name = user.user_name;
            req.session.role = user.role;
            req.session.tasks = userTasks;
            ////

            const accessToken = jwt.sign({user_name}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            const refreshToken = jwt.sign({user_name}, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            await User.updateOne({ user_name: user.user_name },{refresh_token: refreshToken});
            res.cookie('refreshToken', refreshToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.status(200).json({ accessToken: accessToken, message: "logged in successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error\n",error });
    }	
}

module.exports.logout_get = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
   /* const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });*/
    res.clearCookie('refreshToken');
    req.session.destroy((error) => {
        if(error)
            return res.status(500).send({ message: "Internal Server Error\n",error });
        res.clearCookie(process.env.COOKIE_NAME)
        res.status(201).send({ message: "Successfully Logout" });
    });
}