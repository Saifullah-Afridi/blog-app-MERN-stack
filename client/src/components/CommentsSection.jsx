import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createComment, getCommentForPost } from "../store/slices/commentSlice";
import Comment from "./Comment";

const CommentsSection = ({ postId }) => {
  const [content, setContent] = useState("");
  const { comments, singleCommentError, loading } = useSelector(
    (state) => state.comment
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ content, post: postId }))
      .unwrap()
      .then(() => setContent("")) // Clear the content after successful submission
      .catch((err) => console.error("Failed to create comment:", err));
  };

  useEffect(() => {
    if (postId) {
      dispatch(getCommentForPost({ postId }));
    }
  }, [dispatch, postId]);

  return (
    <div className="w-[50%] mx-auto mb-12 flex flex-col gap-3">
      {user ? (
        <div className="flex items-center gap-1">
          <span className="text-sm text-slate-500">Signed in as </span>
          <span className="text-xs text-teal-400">{user.userName}</span>
        </div>
      ) : (
        <div className="flex gap-2">
          <span>Please sign in to comment</span>
          <Link to="/sign-in" className="text-teal-500">
            Sign in
          </Link>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <Textarea
            rows="3"
            maxLength="200"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-2 flex justify-between items-center">
            <div className="flex gap-1 text-teal-400">
              <span>{200 - content.length}</span>
              <span>characters remaining</span>
            </div>
            <Button type="submit" outline gradientDuoTone={"purpleToBlue"}>
              Submit
            </Button>
          </div>
        </form>
      </div>
      {comments.length === 0 ? (
        <div className="mt-4 border-2 p-2 rounded-t-md border-slate-400">
          <h3 className="text-center">No comments Yet</h3>
        </div>
      ) : (
        <div className="mt-3">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
