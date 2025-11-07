import React from "react";
import { LogOut } from "lucide-react";
import useData from "../../context/useData";

function UserDet({ handleLogout }) {
  const { userDetails } = useData();
  return (
    <>
      <div className="w-full bg-black/10 border-t border-cyan-500/20 px-4 py-5 flex justify-between items-center">
        <div className=" flex gap-3 md:gap-4 text-cyan-50 ">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-px">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center  font-bold">
              {userDetails.username[0].toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium">{userDetails.username}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>{" "}
              Active
            </p>
          </div>
        </div>
        <div className="">
          <button
            className="cursor-pointer p-2 text-red-900 hover:text-red-700 transition-colors duration-300 ease-in"
            title="logout"
            onClick={handleLogout}
          >
            <LogOut />
          </button>
        </div>
      </div>
    </>
  );
}

export default UserDet;
