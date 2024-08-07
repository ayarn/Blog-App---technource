const Blog = require("../models/blog.model");
const User = require("../models/user.model");

const addBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { _id, email, name } = req.user;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const user = await User.findById(_id);

        if (!user) {
            return res.status(400).json({ message: "Unauthorized user" });
        }

        const blog = await Blog.create({ title, content });

        if (!blog) {
            return res.status(500).json({ message: "Internal Server Error" });
        }

        blog.user = _id;
        await blog.save();

        res.status(200).json({ message: "Blog has been added" });
    } catch (error) {
        console.log(error)
    }
};

const editBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blogData = req.body;
        console.log(blogData)

        const updatedBlog = await Blog.updateOne({ _id: blogId }, blogData, { new: true });

        res.status(200).json({ message: "Blog has been updated", updatedBlog })
    } catch (error) {
        console.log(error)
    }
};

const getBlogs = async (req, res) => {
    try {
        const { _id, email, name, blogs } = req.user;

        const blogData = await Blog.find({ user: _id });

        res.status(200).json({ message: "All blogs", blogs: blogData });
    } catch (error) {
        console.log(error);
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete({ _id: id });

        res.status(200).json({ message: "Blog has been deleted", deletedBlog });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addBlog,
    editBlog,
    getBlogs,
    deleteBlog
}