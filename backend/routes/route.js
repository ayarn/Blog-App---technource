const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller");
const blog = require("../controllers/blog.controller");
const authentication = require("../middlewares/auth.middleware");

router.route("/register").post(auth.register);
router.route("/login").post(auth.login);
router.route("/user").get(authentication, auth.getCurrentUser);

router.route("/posts").post(authentication, blog.addBlog);
router.route("/posts/:blogId").post(authentication, blog.editBlog);
router.route("/posts").get(authentication, blog.getBlogs);
router.route("/blog/:id").delete(authentication, blog.deleteBlog);

module.exports = router;