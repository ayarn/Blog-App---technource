const User = require("../models/user.model");

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const userExist = await User.findOne({email});

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ email, name, password });

        res.status(201).json({ message: "User successfully registered" });
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = await user.generateToken();

        res.status(200).json({ message: "User loggedin successfully", token });
    } catch (error) {
        console.log(error);
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const { _id, email, name } = req.user;
        
        res.status(200).json({ message: "Current loggedin user", user: { id: _id, email, name } });
    } catch (error) {
        console.log("err", error);
    }
}

module.exports = {
    register,
    login,
    getCurrentUser
}