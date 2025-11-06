import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import OffLoginItm from "./OffLoginItm";
import { useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
function OauthBtns() {
  const [gitLoading, setGitLoding] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const googleLogin = () => {
    setGoogleLoading((prev) => !prev);
    window.location.href = "http://127.0.0.1:8000/api/auth/google";
    setGoogleLoading((prev) => !prev);
  };

  const githubLogin = () => {
    setGitLoding((prev) => !prev);
    window.location.href = "http://127.0.0.1:8000/api/auth/github";
    setGitLoding((prev) => !prev);
  };

  return (
    <div className="flex justify-center gap-6">
      <OffLoginItm
        item={<FaGoogle className="text-xl text-gray-300" />}
        handleClick={googleLogin}
        isLoading={googleLoading}
      />
      <OffLoginItm
        handleClick={githubLogin}
        item={<FaGithub className="text-xl text-gray-300" />}
        isLoading={gitLoading}
      />
      {/* <OffLoginItm
            item={<FaFacebook className="text-xl text-gray-300" />}
          /> */}
    </div>
  );
}

export default OauthBtns;
