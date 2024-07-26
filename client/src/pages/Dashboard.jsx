import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import Posts from "./Posts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState(null);

  useEffect(() => {
    const queryString = new URLSearchParams(location.search);
    const newTab = queryString.get("tab");
    setTab(newTab);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-3">
      <div className="md:w-56">
        <SideBar />
      </div>
      <div className="w-full md:w-5/6 p-4">
        {tab === "profile" ? <Profile /> : null}
        {tab === "posts" ? <Posts /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
