const { mongoose, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
    },
});

UserSchema.methods.generateToken = async function () {
    return jwt.sign(
            {
                _id: this._id,
                email: this.email
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRE
            }
        )
    
}

module.exports = mongoose.model("User", UserSchema);