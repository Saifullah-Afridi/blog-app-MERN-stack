import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiArrowNarrowRight, HiDocumentText } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import Signout from "./Signout";
const SideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState(null);

  useEffect(() => {
    const queryString = new URLSearchParams(location.search);
    const newTab = queryString.get("tab");
    setTab(newTab);
  }, [location.search]);
  return (
    <Sidebar className="w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col ">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              label={"User"}
              labelColor="dark"
              icon={HiUser}
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item active={tab === "posts"} icon={HiDocumentText}>
              Posts
            </Sidebar.Item>
          </Link>

          <Sidebar.Item icon={HiArrowNarrowRight} className="cursor-pointer">
            <Signout />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
