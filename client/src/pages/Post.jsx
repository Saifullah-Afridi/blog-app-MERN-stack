import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllPosts,
  getPostBySlug,
  getSinglePost,
} from "../store/slices/postSlice";

const Post = () => {
  const { postSlug } = useParams();
  const { singlePost, singlePostError, singlePostLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostBySlug(postSlug));
  }, [dispatch, postSlug]);
  return (
    <div className="min-h-screen">
      {singlePostLoading ? (
        <div>loading.....</div>
      ) : (
        <div>{singlePost?.slug}</div>
      )}
    </div>
  );
};

export default Post;
