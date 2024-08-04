import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, updatePost } from "../store/slices/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Select, Spinner, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";

const UpdatePost = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { singlePost, error, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        await dispatch(getSinglePost(id)).unwrap();
      } catch (err) {}
    };
    fetchPost();
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePost) {
      setTitle(singlePost.title);
      setContent(singlePost.content);
      setCategory(singlePost.category);
    }
  }, [singlePost]);
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
      category: category,
    };

    dispatch(updatePost({ userId: user._id, postId: id, data }));
  };
  return (
    <div className=" min-h-screen w-[70%] mx-auto">
      <h1 className="text-3xl text-center py-7">Update Post</h1>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <div className="h-full">
          <form
            onSubmit={handleUpdate}
            className="h-full flex flex-col gap-4 overflow-hidden"
          >
            <TextInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="uncategorzied">Uncategorized</option>
              <option value="ReactJs">React Js</option>
              <option value="NextJs">Next Js</option>
              <option value="NodeJs">Node Js</option>
            </Select>
            <ReactQuill
              className="h-52 mb-5"
              value={content}
              onChange={setContent}
            />
            <Button type="submit" className="mt-4">
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
