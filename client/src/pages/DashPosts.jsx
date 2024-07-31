import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../store/slices/postSlice";
import { Button, Modal, Table } from "flowbite-react";

const DashPosts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [postIdToBeDeleted, setPostIdToDeleted] = useState();
  const { user } = useSelector((state) => state.user);
  const { posts, loading, error, hasMore } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts({ userId: user._id, startIndex: startIndex }));
  }, [user._id, startIndex, dispatch]);
  const handleClick = () => {
    setStartIndex(posts.length);
  };

  const handleNegation = () => {
    setOpenModal(false);
  };
  const handleDeletePost = () => {
    setOpenModal(false);
    dispatch(deletePost({ userId: user._id, postId: postIdToBeDeleted }));
  };
  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading....</p>}
      {posts && (
        <Table className="w-90% mx-auto" hoverable>
          <Table.Head>
            <Table.HeadCell>Updated At</Table.HeadCell>
            <Table.HeadCell>Post Name</Table.HeadCell>
            <Table.HeadCell>category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {posts.map((post) => (
              <Table.Row key={post._id} className="border-b-1 border-gray-500">
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleString()}
                </Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>

                <Table.Cell
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={() => {
                    setOpenModal(true);
                    setPostIdToDeleted(post._id);
                  }}
                >
                  Delete
                </Table.Cell>
                <Table.Cell className="text-green-400 cursor-pointer hover:underline">
                  Edit
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {hasMore && (
        <Button className="w-full mt-3" color="blue" onClick={handleClick}>
          Show More
        </Button>
      )}
      {openModal && (
        <Modal
          dismissible
          show={openModal}
          size="2xl"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="flex flex-col gap-3">
              <h2 className="text-center text-xl">
                Are you sure to delete this Post
              </h2>
              <div className="flex justify-center gap-3 ">
                <Button
                  color="failure"
                  className="px-7"
                  onClick={handleDeletePost}
                >
                  Yes
                </Button>
                <Button
                  color="success"
                  className="px-7"
                  onClick={handleNegation}
                >
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default DashPosts;
