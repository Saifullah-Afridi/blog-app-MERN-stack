import { Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import Signout from "./Signout";
const HeaderMenu = ({ user }) => {
  return (
    <Dropdown
      inline
      label={
        <Avatar
          img={user.profilePicture}
          alt="user profile pciture"
          rounded
          bordered
        />
      }
      arrowIcon={false}
    >
      <Dropdown.Header>
        <span className="block text-sm ">{user.userName}</span>
        <span className="block text-md font-medium truncate">{user.email}</span>
      </Dropdown.Header>
      <Link to="/dashboard?tab=profile">
        <Dropdown.Item>Profile</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item>
        <Signout />
      </Dropdown.Item>
    </Dropdown>
  );
};

export default HeaderMenu;
