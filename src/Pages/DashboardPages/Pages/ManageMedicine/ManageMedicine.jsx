import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import useProducts from "../../../../Hooks/useProducts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import UseCategory from "../../../../Hooks/UseCategory";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const ManageMedicine = () => {
  const { user } = useContext(AuthContext);
  const [products, refetch] = useProducts();
  const [categories] = UseCategory();
  const axiosSecure = useAxiosSecure();
  const sellerMedicine = products.filter(
    (medicine) => medicine.sellerEmail === user.email
  );

  const { register, handleSubmit, reset } = useForm();

  const handleAddMedicine = async (data) => {
    const formData = new FormData();
    console.log(formData);
    
    formData.append("image", data.image[0]);

    try {
      const imgbbResponse = await fetch(imageHostingAPI, {
        method: "POST",
        body: formData,
      });
      const imgbbResult = await imgbbResponse.json();

      if (imgbbResult.success) {
        const newMedicine = {
          ...data,
          medicineImage: imgbbResult.data.url,
          sellerEmail: user.email,
        };

        const res = await axiosSecure.post("/medicine", newMedicine);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Medicine added successfully!",
          });

          // Close the modal
          document.getElementById("my_modal_3").close();

          // Fetch updated list of products
          refetch();

          // Reset the form after submission
          reset();
        }
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        {" "}
        <title>Manage Medicine</title>
      </Helmet>
      <div className="text-center py-7 lg:py-14">
        <h1 className=" text-3xl lg:text-5xl">Manage Your Medicine</h1>
      </div>
      <div className="mx-auto p-8 max-w-[1200px] mt-16 bg-white">
        <div className="flex mb-8 justify-between">
          <h1 className="lg:text-2xl">{`Your Total Product: ${sellerMedicine.length}`}</h1>
          <div className="flex items-center gap-4">
            <h1 className="lg:text-xl">Add New Medicine</h1>
            <button
              className="text-lg btn bg-green-300 text-white"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Now
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg">Add New Medicine</h3>
                <form
                  onSubmit={handleSubmit(handleAddMedicine)}
                  className="space-y-4"
                >
                  <div className="flex gap-2 w-full">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Medicine Name
                      </label>
                      <input
                        type="text"
                        name="medicineName"
                        {...register("medicineName", { required: true })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Generic Name
                      </label>
                      <input
                        type="text"
                        name="genericName"
                        {...register("genericName", { required: true })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      {...register("shortDescription", { required: true })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="mt-2">
                    <label className="text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      {...register("image", { required: true })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-full flex gap-2">
                    <div className="w-full">
                      <label className="text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        {...register("category", { required: true })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option
                            key={category._id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                        {/* Add more categories as needed */}
                      </select>
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        {...register("medicineCompany", { required: true })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter Company Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Unit (Mg or ML)
                      </label>
                      <input
                        type="text"
                        name="unit"
                        {...register("massUnit", { required: true })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Per Unit Price
                      </label>
                      <input
                        type="text"
                        name="perUnitPrice"
                        {...register("perUnitPrice", { required: true })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount Percentage
                    </label>
                    <input 
                      defaultValue={0}
                      type="number"
                      name="discount"
                      {...register("discountPercentage", { required: true })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      className="btn bg-green-300 text-white"
                    >
                      Add Medicine
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
        {/* <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-custom-custom text-white">
                <th></th>
                <th className="lg:text-xl">Name</th>
                <th className="lg:text-xl">Category</th>
                <th className="lg:text-xl">Company</th>
                <th className="lg:text-xl">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {sellerMedicine.map((product, index) => (
                <tr key={product._id} className="hover">
                  <th className="">{index + 1}</th>
                  <td className="lg:text-lg">{product.medicineName}</td>
                  <td className="lg:text-base">{product.category}</td>
                  <td className="lg:text-base">{product.medicineCompany}</td>
                  <td className="lg:text-base font-semibold">
                    ${product.perUnitPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default ManageMedicine;
