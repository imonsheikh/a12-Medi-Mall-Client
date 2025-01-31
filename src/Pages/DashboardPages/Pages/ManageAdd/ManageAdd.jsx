import { useContext } from "react";
import UseAdvice from "../../../../Hooks/UseAdvice";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const ManageAdd = () => {
  const { user } = useContext(AuthContext);
  const [advices, refetch] = UseAdvice();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const sellerAdvices = advices.filter(
    (advice) => advice?.sellerEmail === user?.email
  );

  const handleAddAdvice = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const imgbbResponse = await fetch(imageHostingAPI, {
        method: "POST",
        body: formData,
      });
      const imgbbResult = await imgbbResponse.json();

      if (imgbbResult.success) {
        const newAdvice = {
          ...data,
          adviceImage: imgbbResult.data.url,
          sellerEmail: user.email,
          status: 'pending',
        };

        const res = await axiosSecure.post("/advice", newAdvice);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Advice added successfully!",
          });

          // Close the modal
          document.getElementById("my_modal_3").close();

          // Fetch updated list of advices
          refetch();

          // Reset the form after submission
          reset();
        }
      }
    } catch (error) {
      console.error("Error adding advice:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
        <Helmet><title>Advirtizment</title></Helmet>
      <div className="text-center py-14">
        <h1 className="text-5xl uppercase">Your advertisement</h1>
      </div>
      <div className="max-w-[1000px] mx-auto mt-4">
        <div className="flex justify-end mb-4">
          <button
            className="btn lg:text-lg bg-green-300"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            ADD NEW ADVICE
            <IoMdAddCircleOutline />
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                <form className="space-y-5" onSubmit={handleSubmit(handleAddAdvice)}>
                  <div className="mt-2">
                    <label className="text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      name="image"
                      {...register("image", { required: true })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm my-4 font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      {...register("title", { required: true })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Price*</label>
                    <input
                      type="text"
                      name="price"
                      {...register("price", { required: true })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Details</label>
                    <textarea
                      name="details"
                      {...register("details", { required: true })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn w-full bg-custom-custom text-white">
                    ADD ADVICE
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-custom-custom text-white">
                <th>#</th>
                <th className="text-sm lg:text-xl">Image</th>
                <th className="text-sm lg:text-xl">Title</th>
                <th className="text-sm lg:text-xl">Price</th>
                <th className="text-sm lg:text-xl w-[200px]">Details</th>
                <th className="text-sm lg:text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {sellerAdvices.map((product, index) => (
                <tr key={product._id}>
                  <td className="text-lg">{index + 1}</td>
                  <td className="text-lg">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={product.adviceImage} alt="medicine" />
                      </div>
                    </div>
                  </td>
                  <td className=" text-sm lg:text-lg">{product.title.slice(0, 16)}...</td>
                  <td className="text-sm lg:text-xl">${product.price}</td>
                  <td className="text-sm">{product.details.slice(0, 45)}..</td>
                  <td className="text-sm">{product.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdd;
