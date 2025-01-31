import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import useSeller from "../../Hooks/useSeller";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
  const { user, updateUser} = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  const { register, handleSubmit } = useForm();
  const handleUpdateProfile = async (data) => {
    try {
      let photoURL = user.photoURL;

      if (data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const response = await axios.post(image_hosting_api, formData);
        photoURL = response.data.data.display_url;
      }

      console.log("Name:", data.username);
      console.log("Photo URL:", photoURL);

      updateUser(data.username, photoURL)
      .then(()=>{
        window.location.reload();
        toast.success('Update Success!')
      })
      .catch(error=>{
        toast.error(error.message)
      })

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="my-8 max-w-[1540px] mx-auto">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className="flex flex-col justify-center mx-auto max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
        <img
          src={user.photoURL}
          alt=""
          className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {user.displayName}
            </h2>
            <p className="px-5 text-xs sm:text-base dark:text-gray-600">
              {user.email}
            </p>
          </div>
          <div className="border-t-2">
            <h1 className="text-lg">
              <span className="text-xl font-semibold">Status: </span>
              {isAdmin ? "Admin" : isSeller ? "Seller" : "User"}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-center dark:text-gray-800">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          noValidate=""
          className="flex bg-orange-200 flex-col w-full mx-2 max-w-lg p-12 rounded shadow-lg"
        >
          <label htmlFor="username" className="self-start text-xs font-semibold">
            Change Name
          </label>
          <input
            defaultValue={user.displayName}
            id="username"
            type="text"
            {...register("username", { required: true })}
            className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2"
          />
          <label htmlFor="photo" className="self-start mt-3 text-xs font-semibold">
            Change Photo
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            {...register("photo")}
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button
            type="submit"
            className="flex items-center justify-center h-12 px-6 mt-8 text-sm rounded btn font-bold"
          >
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
