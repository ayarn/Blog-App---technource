const mongoose = require("mongoose");

const connectDatabase = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDatabase;