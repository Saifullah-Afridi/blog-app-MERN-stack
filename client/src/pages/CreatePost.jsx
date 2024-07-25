import { TextInput } from "flowbite-react";
import React from "react";

const CreatePost = () => {
  return (
    <div className="pt-[2rem] mb-6">
      <div className="flex flex-col gap-3 w-full md:w-[85%] px-3 mx-auto text-black ">
        <h1 className="text-3xl text-center font-semibold">Create a Post</h1>
        <form className="flex flex-col gap-3">
          <TextInput type="text" placeholder="Title" />
          <select className="rounded-md">
            <option selected>Select a Category</option>
            <option>React</option>
            <option>Nodejs</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
