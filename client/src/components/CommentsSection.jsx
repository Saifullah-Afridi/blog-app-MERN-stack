<<<<<<< HEAD
import { Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createComment } from "../store/slices/commentSlice";

const CommentsSection = () => {
  const [content, setContent] = useState("");
  const { singlePost } = useSelector((state) => state.post);
  const { singleComment, singleCommentError } = useSelector(
    (state) => state.comment
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ content, post: singlePost._id })).then(
      (resultAction) => {
        if (createComment.fulfilled.match(resultAction)) {
          console.log("success", resultAction.payload);
          setContent("");
        }
      }
    );
  };
  return (
    <div className="w-[50%] mx-auto mb-12 flex flex-col gap-3">
      {user ? (
        <div className="flex   items-center  gap-1">
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
    </div>
  );
=======
import React from "react";

const CommentsSection = () => {
  return <div className="w-[70%] mx-auto mb-12">CommentsSection</div>;
>>>>>>> c20b842a6a13ffbc36df6f5f4f2dbdd72ebf5511
};

export default CommentsSection;
