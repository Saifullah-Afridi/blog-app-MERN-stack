import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../store/slices/postSlice";
import { useParams } from "react-router-dom";
import { Alert, Button, Select, Spinner, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";

const UpdatePost = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();

  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { singlePost, error, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        await dispatch(getSinglePost(id)).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [dispatch, id]);
  console.log(singlePost);

  useEffect(() => {
    if (singlePost) {
      setTitle(singlePost.title);
      setContent(singlePost.content);
      setCategory(singlePost.category);
    }
  }, [singlePost]);
  const handleSubmit = () => {};
  return (
    <div className=" min-h-screen w-[70%] mx-auto">
      <h1 className="text-3xl text-center py-7">Update Post</h1>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <div className="h-full">
          <form
            onSubmit={handleSubmit}
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
              <option value="reactjs">React Js</option>
              <option value="nextjs">Next Js</option>
              <option value="nodejs">Node Js</option>
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
