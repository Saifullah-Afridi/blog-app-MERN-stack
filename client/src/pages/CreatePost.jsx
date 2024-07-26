import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.post(
          "http://localhost:3000/api/v1/post/",
          {
            title,
            category,
            content,
          },
          {
            withCredentials: true,
            credentials: true,
          }
        );
        console.log(res);
        if (res.status === 201) {
          setLoading(false);
          setError("");
          navigate(`${res.data.post.slug}`);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.respose.data.message);
      }
    };
    sendData();
  };

  return (
    <div className="pt-[2rem] mb-6 min-h-screen">
      <div className="flex flex-col gap-3 w-full md:w-[70%] px-3 mx-auto text-black ">
        <h1 className="text-3xl text-center font-semibold">Create a Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <select
            className="rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option selected value="uncategorized">
              Select a Category
            </option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="nextja">Nextjs</option>
            <option value="nodejs">Nodejs</option>
          </select>
          <ReactQuill
            theme="snow"
            className="h-60 mb-14"
            required
            value={content}
            onChange={setContent}
          />
          <Button type="submit" gradientDuoTone="purpleToPink">
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
