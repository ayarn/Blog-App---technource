const { mongoose, Schema } = require("mongoose");

const BlogSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Blog", BlogSchema);