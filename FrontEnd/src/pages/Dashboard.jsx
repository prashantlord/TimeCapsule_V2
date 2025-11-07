import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getUser } from "../backend/userFns";
import { UserProvider } from "../context/useData";
import LeftBar from "../components/Dashboard/LeftBar";
import Header from "../components/Dashboard/Header";
import { Globe, Home, Package, PlusCircle, Settings } from "lucide-react";
import { Outlet } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState({
    label: "Dashboard",
    link: "dashboard",
    icon: Home,
  });
  const [userDetails, setUserDetails] = useState({
    id: 1,
    username: "Guest",
    email: "guest",
  });
  const [statusBar, setStatusBar] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");

      if (token) {
        {
          localStorage.setItem("auth_token", JSON.stringify(token));
          localStorage.setItem("auth_role", JSON.stringify("user"));
        }
        navigate("/dashboard", { replace: true });
        return;
      }

      const valid_user = await getUser();
      console.log(valid_user);
      if (!valid_user) {
        navigate("/login");

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
  const navItems = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: Home,
    },
    {
      label: "Create Capsule",
      link: "create",
      icon: PlusCircle,
    },
    {
      label: "My Capsules",
      link: "my",
      icon: Package,
    },
    {
      label: "Public Capsules",
      link: "public",
      icon: Globe,
    },
    {
      label: "Settings",
      link: "settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <div className="absolute -z-10 inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#111111] via-[#141414] to-[#0a0a0a] opacity-95"></div>

      <UserProvider value={{ userDetails, setUserDetails }}>
        <div className="flex min-h-screen">
          <LeftBar
            statusBar={statusBar}
            setStatusBar={setStatusBar}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            navItems={navItems}
          />

          <div className="flex-1 flex flex-col">
            <Header
              statusBar={statusBar}
              setStatusBar={setStatusBar}
              activeNav={activeNav}
            />
            <main className="flex px-5 mt-5">
              <Outlet />
            </main>
          </div>
        </div>
      </UserProvider>
    </>
  );
}

export default Dashboard;
