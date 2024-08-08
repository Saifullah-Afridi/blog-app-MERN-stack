import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Button, Spinner } from "flowbite-react";
import { getPostBySlug } from "../store/slices/postSlice";
import CallAction from "../components/CallAction";
import CommentsSection from "../components/CommentsSection";

const Post = () => {
  const { postSlug } = useParams();
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const { singlePost, singlePostError, singlePostLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (postSlug) {
      dispatch(getPostBySlug(postSlug));
    }
  }, [postSlug, dispatch]);

  return (
    <div className="min-h-screen">
      {singlePostLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      )}
      {singlePostError && <Alert color="failure">{singlePostError}</Alert>}
      {singlePost && !singlePostLoading && (
        <div className="flex flex-col gap-7">
          <h2 className="text-2xl w-[70%] p-5 mx-auto mt-10 text-center">
            {singlePost.title}
          </h2>
          <Button className="text-xs self-center" pill color="gray">
            {singlePost.category}
          </Button>
          <div
            className="w-[50%] mx-auto"
            dangerouslySetInnerHTML={{ __html: singlePost.content }}
          />
          <div className="w-[70%] mx-auto">
            <CallAction />
          </div>
          <CommentsSection postId={singlePost._id} />
        </div>
      )}
    </div>
  );
};

export default Post;
