import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../store/slices/postSlice";
import { Table } from "flowbite-react";

const DashPosts = () => {
  const { user } = useSelector((state) => state.user);
  const { posts, loading, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts({ userId: user._id }));
  }, [user._id]);
  console.log(posts, "1st");
  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading....</p>}
      {posts && (
        <Table className="w-90% mx-auto">
          <Table.Head>
            <Table.HeadCell>Updated At</Table.HeadCell>
            <Table.HeadCell>Post Name</Table.HeadCell>
            <Table.HeadCell>category</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {posts.map((post) => (
              <Table.Row key={post._id}>
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleString()}
                </Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <Table.Cell>Delete</Table.Cell>
                  <Table.Cell>Edit</Table.Cell>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default DashPosts;
