const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


async function auth(req, res, next) {
    try {
        let token = ''
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            token = authHeader.split(' ')[1];
        }
        
        if (!token) {
            return res.status(400).json({ message: "Token is missing" });
        }

        let decodedToken;
        
        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Token expired" });
        }
        
        const user = await User.findById(decodedToken?._id).select("-password");
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        
        req.token = token;
        // current user
        req.user = user;
        next();
    } catch (err) {
        console.log(err)
    }
};

module.exports = auth;