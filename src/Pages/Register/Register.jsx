import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {  FaRegEye } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../../Hooks/usePublicAxios";
import SocialLogin from "../../Component/SosialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = usePublicAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUpUser, updateUser } = useContext(AuthContext);
  const [passError, setPassError] = useState("");
  const location = useLocation();
  const navigete = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.password < 6) {
      setLoading(false)
      setPassError("please provide more then 6 character password");
      return;
    }
    if (!/[A-Z]/.test(data.password)) {
      setLoading(false)
      setPassError("please must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(data.password)) {
      setLoading(false)
      setPassError("please must contain at least one lowercase letter");
      return;
    }
    const formData = new FormData();
    formData.append("image", data.image[0]);
    const res = await axios.post(image_hosting_api, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const image = res.data.data.display_url;
    if (res.data.success) {
      signUpUser(data.email, data.password)
        .then((result) => {
          console.log(result.user);
          if (result.user) {
            updateUser(data.name, image)
              .then(() => {
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  role: data.role,
                };
                axiosPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    setLoading(false);
                    toast.success("register successfully !");
                    navigete(location?.state ? location.state : "/");
                  }
                });
                navigete(location?.state ? location.state : "/");
              })
              .catch((error) => {
                setLoading(false);
                toast.error(error.message);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="bg-gray-900 text-[#333] md:h-screen">
      <Helmet>
        <title>MediMall || Register</title>
      </Helmet>
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4 md:block hidden">
          <img
            src="https://i.ibb.co/W3QMLH8/signin-image.png"
            className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="flex items-center md:p-8 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg w-full mx-auto"
          >
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold">
                Sign <span className="text-custom-custom">UP</span>
              </h3>
              <p className="text-sm mt-4">
                Already have an account
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mb-8">
              <label className="text-xs block mb-2">Username</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                placeholder="Enter Username"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-8">
              <label className="text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  {...register("email", { required: true })}
                  type="text"
                  className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                <p className="absolute right-2 cursor-pointer">
                  <IoMailOutline />
                </p>
              </div>
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="my-8">
              <label className="text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                <p className="absolute right-2 cursor-pointer">
                  <FaRegEye />
                </p>
              </div>
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
              {passError ? (
                <span className=" text-[13px] text-red-500">{passError}</span>
              ) : (
                ""
              )}
            </div>

            <div>
              <label className="text-xs block mb-2">Role</label>
              <select
                required
                {...register("role", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select Your Role
                </option>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
              {errors.role && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <input
              {...register("image", { required: true })}
              type="file"
              name="image"
              className="file-input file-input-warning mt-8 file-input-bordered w-full"
            />
            {errors.image && (
              <span className="text-red-500">This field is required</span>
            )}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-custom-custom focus:outline-none"
              >
                {loading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <p className=" text-lg">Sign Up</p>
                )}
              </button>
            </div>

            <p className="my-8 text-sm text-gray-400 text-center">
              or continue with
            </p>

            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
