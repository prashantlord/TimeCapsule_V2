import React from "react";
import ActionButtons from "../../components/Dashboard/ActionButtons";
import { PlusCircle, Globe, User, Activity } from "lucide-react";
import { useNavigate } from "react-router";
import CalendarBox from "../../components/Dashboard/CalendarBox";

function DashMain() {
  const navigate = useNavigate();

  const quickActions = [
    { title: "Create New", link: "create", icon: PlusCircle },
    { title: "Explore Public", link: "public", icon: Globe },
    { title: "Profile", link: "profile", icon: User },
    { title: "Activity", link: "my", icon: Activity },
  ];
  const handleClick = (link) => {
    navigate(`/dashboard/${link}`);
  };

  return (
    <>
      <div className="w-full flex flex-col xl:flex-row gap-5 px-5">
        <div className="w-full">
          <ActionButtons
            quickActions={quickActions}
            handleClick={handleClick}
          />
        </div>
        <div className="w-full md:w-120 h-200 ">
          <CalendarBox />
        </div>
      </div>
    </>
  );
}

export default DashMain;
