import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, resetAllUsers } from "../store/slices/userSlices";
import { Alert, Button, Modal, Spinner, Table } from "flowbite-react";

const DashUsers = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { allUsers, allUsersLoading, allUsersError, hasMore } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(resetAllUsers());
        await dispatch(getAllUsers(startIndex));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, [startIndex]);
  const handleClick = () => {
    setStartIndex(allUsers.length);
  };
  return (
    <div>
      {allUsersError && <Alert />}
      {allUsers && (
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
      {hasMore && (
        <Button onClick={handleClick} className="mx-auto mt-6">
          Show More
        </Button>
      )}

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header />
      </Modal>
    </div>
  );
};

export default DashUsers;
