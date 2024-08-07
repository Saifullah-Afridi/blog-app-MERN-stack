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
    console.log(req.query);
    const startIndex = parseInt(req.query.startIndex, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    let queryObj = {};
    if (req.query.category) {
      queryObj.category = req.query.category;
    }
    if (req.query.slug) {
      queryObj.slug = req.query.slug;
    }
    if (req.query.userId) {
      queryObj.user = req.query.userId;
    }
    if (req.query.postId) {
      queryObj._id = req.query.postId;
    }
    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    console.log(queryObj);
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find(queryObj)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    if (!posts) {
      return next(new AppError("no post is found", 400));
    }
    res.status(200).json({
      totalPosts,
      lastMonthPosts,
      posts,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};
const deletePost = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(new AppError("You can not delete this post", 400));
    }
    const post = await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({
      status: "success",
      message: "post has been deleted",
      post,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
const updatePost = async (req, res, next) => {
  try {
    if (String(req.user._id) !== req.params.userId) {
      return next(new AppError("You are not allowed to update this post", 400));
    }
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        slug: req.body.title
          .trim()
          .split(" ")
          .join("-")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!post) {
      return next(
        new AppError("The post you want to update does not exist", 400)
      );
    }
    res.status(200).json({
      status: "success",
      message: "Post has been updated",
      post,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    if (!post) {
      return next(new AppError("Post not found", 404));
    }
    res.status(200).json({
      status: "success",
      post,
    });
  } catch (error) {}
};
module.exports = {
  createPost,
  getSinglePost,
  getAllPosts,
  deletePost,
  updatePost,
  getPostBySlug,
};
