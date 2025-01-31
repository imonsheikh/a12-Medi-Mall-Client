import { useForm } from "react-hook-form";
import { IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../Component/SosialLogin/SocialLogin";
import { FaRegEye } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigete = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    loginUser(data.email, data.password)
      .then((result) => {
        setLoading(false);
        const token = result.user.stsTokenManager.accessToken;
        localStorage.setItem('access-token', token);
        toast.success("Successfully logged in!");
        navigete(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.error(error);
      });
  };
  
  return (
    <div className="font-[sans-serif] bg-gray-900 text-[#333] md:h-screen">
      <Helmet>
        <title>MediMall || Login</title>
      </Helmet>
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://i.ibb.co/W3QMLH8/signin-image.png"
            className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="flex flex-col justify-center items-center md:p-8 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
          <form
            className="max-w-lg w-full mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold">
                Sign <span className=" text-custom-custom">in</span>
              </h3>
              <p className="text-sm mt-4 ">
                Don`t have an account{" "}
                <Link
                  to="/register"
                  href="javascript:void(0);"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>
            <div>
              <label className="text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  {...register("email")}
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                  placeholder="Enter email"
                />

                <p className=" absolute right-2 cursor-pointer">
                  <IoMailOutline />
                </p>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  {...register("password")}
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                <p className=" absolute right-2 cursor-pointer">
                  <FaRegEye />
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-5"></div>
            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-custom-custom focus:outline-none"
              >
                {loading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <p className=" text-lg">Sign In</p>
                )}
              </button>
            </div>
            <p className="my-8 text-sm text-gray-400 text-center">
              or continue with
            </p>
          </form>
         <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
