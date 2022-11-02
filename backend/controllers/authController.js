const User = require('../models/User');
const Task = require('../models/Task');

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('/');
}

module.exports.usersession_get = (req, res) => {
    try {
        if(req.session.role =="User"){
            res.status(201).send({user_name: req.session.user_name, tasks: req.session.tasks, role: req.session.role, message: "User Access" });
        }
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

module.exports.signup_post = async (req, res) => {
    try {
        if (await User.findOne({ email: req.body.email }))
            return res.status(409).send({ message: "!User with given email already Exist" });
        else if(await User.findOne({ email: req.body.user_name }))
            return res.status(409).send({ message: "!User with given User Name already Exist" });

        const user = await User.create({ ...req.body });
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "!Internal Server Error\n",error });
    }
}

module.exports.login_post = async (req, res) => {
    try {
        const user = await User.login(req.body.user_name, req.body.password);
        const userTasks = await Task.find({dedicated_user: req.body.user_name});
        //const redis_response = await redisClient.set("taskuserTasks", userTasks);
        console.log(user)
        req.session.user_name = user.user_name;
        req.session.role = user.role;
        req.session.tasks = userTasks;
        res.status(200).send({ user_name: user.user_name, role: user.role, message: "logged in successfully" });
    } catch (error) {
        if(error === "!Invalid Email or Password")
            res.status(401).send({ message: error });
        else
            res.status(500).send({ message: "Internal Server Error\n",error });
    }	
}

module.exports.logout_get = async (req, res) => {
    req.session.destroy((error) => {
        if(error)
            return res.status(500).send({ message: "Internal Server Error\n",error });
        res.clearCookie(process.env.COOKIE_NAME)
        res.status(201).send({ message: "Successfully Logout" });
    });
    
}