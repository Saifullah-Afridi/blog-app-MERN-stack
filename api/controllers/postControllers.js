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

const getAllPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    // let queryObj;
    // if (req.query.category) {
    //   queryObj.category = req.query.category;
    // }
    // if (req.query.slug) {
    //   queryObj.slug = req.query.slug;
    // }
    // if (req.query.userId) {
    //   queryObj.user = req.query.userId;
    // }
    // if (req.query.postId) {
    //   queryObj._id = req.query.postId;
    // }
    // if (req.query.searchTerm) {
    //   query.$or = [
    //     { title: { $regex: req.query.searchTerm, $options: "i" } },
    //     { content: { $regex: req.query.searchTerm, $options: "i" } },
    //   ];
    // }
    // console.log(queryObj, "+++++++++++++++");
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find({ user: req.query.userId })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    if (!posts) {
      return next(new AppError("no post is found", 400));
    }
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};
module.exports = { createPost, getSinglePost, getAllPosts };
