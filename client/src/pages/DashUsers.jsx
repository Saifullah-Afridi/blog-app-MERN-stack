import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  resetAllUsers,
} from "../store/slices/userSlices";
import { Alert, Button, Modal, Spinner, Table } from "flowbite-react";

const DashUsers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { allUsers, allUsersLoading, allUsersError, hasMore, startIndex } =
    useSelector((state) => state.user);
  useEffect(() => {
    dispatch(resetAllUsers());
    dispatch(getAllUsers({ startIndex: 0 }));
  }, [dispatch]);
  const handleShowMore = () => {
    if (hasMore) {
      dispatch(getAllUsers({ startIndex: allUsers.length }));
    }
  };
  const handleDelete = () => {
    dispatch(deleteUser(userId));
  };
  return (
    <div>
      {allUsersError && <Alert />}
      {allUsersLoading ? (
        <Spinner />
      ) : (
        <Table>
          <Table.Head
            className="bg-green-800 
            "
          >
            <Table.HeadCell>Data Created</Table.HeadCell>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {allUsers.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.created_at}</Table.Cell>
                <Table.Cell>{user.userName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role === "admin" ? "yes" : "no"}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                      setUserId(user._id);
                    }}
                    color="failure"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {hasMore && <Button onClick={handleShowMore}>Show More</Button>}
      {openModal && (
        <Modal
          popup
          dismissible
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <h3 className="text-xl text-center">
              Are You Sure,To delete this user
            </h3>
            <div className="flex mt-4 justify-center gap-3">
              <Button onClick={handleDelete} className="px-5" color="failure">
                Yes
              </Button>
              <Button
                color="success"
                className="px-5"
                onClick={() => setOpenModal(false)}
              >
                No
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default DashUsers;
