const Post = require("../models/postModel");
const AppError = require("../utils/AppError");
const createPost = async (req, res, next) => {
  try {
    const { title } = req.body;
    const findPost = await Post.findOne({ title: req.body.title });
    if (findPost) {
      return next(new AppError("The Post with this title already exist ", 400));
    }
    const slug = title
      .trim()
      .split(" ")
      .join("-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    //parent Referencing
    const post = await Post.create({
      ...req.body,
      slug: slug,
      user: req.user._id,
    });

    // childReferencing
    // const post = new Post({
    //   ...req.body,
    //   slug,
    // });
    // await post.save();
    // req.user.posts.push(post._id);
    // await req.user.save();

    res.status(201).json({
      status: "success",
      post,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new AppError("No Post Found with this ID", 404));
    }
    res.status(200).json({
      status: "sucess",
      post,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
module.exports = { createPost, getSinglePost };
