import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState(null);

  useEffect(() => {
    const queryString = new URLSearchParams(location.search);
    const newTab = queryString.get("tab");
    setTab(newTab);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <SideBar />
      </div>

      {tab === "profile" ? <Profile /> : null}
      {tab === "hello" ? <h1>Hello</h1> : null}
    </div>
  );
};

export default Dashboard;
