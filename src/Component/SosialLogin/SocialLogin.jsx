import { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import usePublicAxios from "../../Hooks/usePublicAxios";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const axiosPublic = usePublicAxios();
  const { googleLogin, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGithubLogin = () => {
    githubLogin()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="space-x-8 flex items-center justify-center">
      <p onClick={handleGoogleLogin} className=" cursor-pointer text-4xl">
        <FcGoogle />
      </p>
      <p onClick={handleGithubLogin} className=" cursor-pointer text-4xl">
        <FaGithub />
      </p>

      <button type="button" className="border-none w-[38px] outline-none">
        <img src="https://i.ibb.co/nQxZ8Xy/communication-1.png" alt="" />
      </button>
    </div>
  );
};

export default SocialLogin;
