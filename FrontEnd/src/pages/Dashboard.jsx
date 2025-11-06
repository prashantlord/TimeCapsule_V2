import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getUser } from "../backend/userFns";
import { UserProvider } from "../context/useData";
import axios from "axios";
import LeftBar from "../components/Dashboard/LeftBar";
import Header from "../components/Dashboard/Header";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({
    id: 1,
    username: "Guest",
    email: "guest",
  });
  const [statusBar, setStatusBar] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");

      if (token) {
        {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("auth_role", "user");
        }
        navigate("/dashboard", { replace: true });
        return;
      }

      const valid_user = await getUser();

      if (!valid_user) {
        navigate("/login");
        console.log("breaks here");
        return;
      }
      let temp = {
        id: valid_user.id,
        username: valid_user.username,
        email: valid_user.email,
      };

      setUserDetails(temp);
    };
    checkUser();
  }, []);

  return (
    <>
      <div className="absolute -z-10 inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#111111] via-[#141414] to-[#0a0a0a] opacity-95"></div>

      <UserProvider value={{ userDetails, setUserDetails }}>
        <div className="flex min-h-screen">
          <LeftBar statusBar={statusBar} setStatusBar={setStatusBar} />

          <div className="flex-1 flex flex-col">
            <Header statusBar={statusBar} setStatusBar={setStatusBar} />
          </div>
        </div>
      </UserProvider>
    </>
  );
}

export default Dashboard;
