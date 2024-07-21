import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../store/slices/userSlices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteAccount = () => {
  const [showModel, setShowModel] = useState(false);
  const { user } = useSelector((state) => state.user);
  const disptach = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    setShowModel(false);
    disptach(deleteUser(user._id));
  };

  return (
    <>
      <span onClick={() => setShowModel(true)} className="cursor-pointer">
        Delete Account
      </span>
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body className="mb-3">
          <div className="flex flex-col justify-center gap-4">
            <HiOutlineExclamationCircle className="h-14 m-auto  w-14 text-gray-500" />
            <h3 className="text-xl self-center">
              Are you sure want to delete Your Account
            </h3>
            <div className="flex justify-center gap-5">
              <Button onClick={handleDelete} color="failure" className="px-4 ">
                Yes
              </Button>
              <Button
                onClick={() => setShowModel(false)}
                className="success px-4"
              >
                {" "}
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteAccount;
