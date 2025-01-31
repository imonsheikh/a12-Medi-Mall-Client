import { useState } from "react";
import Swal from "sweetalert2";
import UseCategory from "../../../../Hooks/UseCategory";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useProducts from "../../../../Hooks/useProducts";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageCategory = () => {
  const [categories] = UseCategory();
  const [products, refetch] = useProducts();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDelete = async (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/medicine/${categoryId}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        }
      }
    });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    Object.keys(product).forEach((key) => {
      setValue(key, product[key]);
    });
    setIsModalOpen(true);
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.categoryName.value;
    const image = form.image.value;
    const category = {
      categoryName,
      image,
    };

    axiosSecure
      .post("/category", category)
      .then((response) => {
        if (response.data.insertedId) {
          refetch();
          toast.success("Category added");
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onSubmit = async (data) => {
    let imageUrl = data.medicineImage;
    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const imgData = await response.json();
      if (imgData.success) {
        imageUrl = imgData.data.display_url;
      } else {
        toast.error("Image upload failed");
        return;
      }
    }

    const updatedProduct = {
      ...data,
      medicineImage: imageUrl,
    };

    const res = await axiosSecure.put(`/medicine/${data._id}`, updatedProduct);
    console.log(res);
    closeModal();
    refetch();
    Swal.fire("Updated", "Update Successful.", "success")
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Manage Category</title>
      </Helmet>
      <div className="text-center py-7 lg:py-14">
        <h1 className=" text-3xl lg:text-5xl">Manage All Categories</h1>
      </div>
      <div className="mx-auto p-8 max-w-[1200px] mt-10 bg-white">
       <div className=" flex justify-center">
       <button
          className="btn bg-blue-500  mb-5 text-base font-semibold text-white"
          onClick={() => setIsModalOpen(true)}
        >
          ADD NEW CATEGORY
        </button>
       </div>

        {isModalOpen && (
          <dialog id="my_modal_3" className="modal" open>
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </form>
              <form onSubmit={handleAddNew} className="card-body">
                <h1 className="text-2xl text-center">Add a new Category</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="categoryName"
                    className="input input-bordered border-2"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Image URL"
                    name="image"
                    className="input input-bordered border-2"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn text-base text-white bg-custom-custom">
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-custom-custom text-white">
                <th className=" md:block hidden"></th>
                <th className="lg:text-xl">Name</th>
                <th className="lg:text-xl">Category</th>
                <th className="lg:text-xl">Per Unit Price</th>
                <th className="text-center lg:text-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <th className=" md:block hidden">
                    <img
                      src={product.medicineImage}
                      alt={product.medicineName}
                      className="w-16 h-16 object-cover"
                    />
                  </th>
                  <td>
                    <h1 className="lg:text-lg uppercase">
                      {product.medicineName}
                    </h1>
                  </td>
                  <td>
                    <h1 className=" lg:text-base">{product.category}</h1>
                  </td>
                  <td className=" lg:text-lg">${product.perUnitPrice}</td>
                  <td className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn px-4 py-2 bg-green-300 text-white hover:bg-green-400"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn px-4 py-2 bg-red-300 text-white hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full  rounded"
            >
              <label
                htmlFor="medicineName"
                className="self-start text-xs font-semibold"
              >
                Medicine Name
              </label>
              <input
                {...register("medicineName", {
                  required: "Medicine Name is required",
                })}
                id="medicineName"
                type="text"
                className={`flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2 ${
                  errors.medicineName && "border-red-500"
                }`}
              />
              {errors.medicineName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.medicineName.message}
                </p>
              )}

              <label
                htmlFor="genericName"
                className="self-start text-xs font-semibold"
              >
                Generic Name
              </label>
              <input
                {...register("genericName", {
                  required: "Generic Name is required",
                })}
                id="genericName"
                type="text"
                className={`flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2 ${
                  errors.genericName && "border-red-500"
                }`}
              />
              {errors.genericName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.genericName.message}
                </p>
              )}

              <label
                htmlFor="shortDescription"
                className="self-start text-xs font-semibold"
              >
                Short Description
              </label>
              <input
                {...register("shortDescription", {
                  required: "Short Description is required",
                })}
                id="shortDescription"
                type="text"
                className={`flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2 ${
                  errors.shortDescription && "border-red-500"
                }`}
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.shortDescription.message}
                </p>
              )}

              <label
                htmlFor="image"
                className="self-start mt-3 text-xs font-semibold"
              >
                Change Photo
              </label>
              <input
                {...register("image")}
                accept="image/*"
                type="file"
                className={`file-input file-input-bordered border-2 w-full max-w-xs ${
                  errors.image && "border-red-500"
                }`}
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message}
                </p>
              )}

              <label
                htmlFor="company"
                className="self-start text-xs font-semibold"
              >
                Company
              </label>
              <input
                {...register("medicineCompany", {
                  required: "Company is required",
                })}
                id="medicineCompany"
                type="text"
                className={`flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2 ${
                  errors.medicineCompany && "border-red-500"
                }`}
              />
              {errors.medicineCompany && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.medicineCompany.message}
                </p>
              )}

              <label htmlFor="mg" className="self-start text-xs font-semibold">
                massUnit
              </label>
              <input
                {...register("massUnit", {
                  required: "massUnit is required",
                  min: { value: 0, message: "Mg cannot be less than 0" },
                })}
                id="massUnit"
                type="text"
                className={`flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2 ${
                  errors.massUnit && "border-red-500"
                }`}
              />
              {errors.massUnit && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.massUnit.message}
                </p>
              )}

              <label
                htmlFor="unitPrice"
                className="self-start text-xs font-semibold"
              >
                Per Unit Price
              </label>
              <input
                {...register("perUnitPrice", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be less than 0" },
                })}
                id="perUnitPrice"
                type="text"
                className={`flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2 ${
                  errors.perUnitPrice && "border-red-500"
                }`}
              />
              {errors.perUnitPrice && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.perUnitPrice.message}
                </p>
              )}

              <label
                htmlFor="discount"
                className="self-start text-xs font-semibold"
              >
                Discount
              </label>
              <select
                {...register("discountPercentage", {
                  required: "Discount is required",
                  min: { value: 0, message: "Discount cannot be less than 0" },
                })}
                id="discountPercentage"
                className={`block w-full p-2 mt-1 border-2 border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.discountPercentage && "border-red-500"
                }`}
              >
                <option value={0}>No Discount</option>
                <option value={5}>5% Discount</option>
                <option value={10}>10% Discount</option>
                <option value={25}>25% Discount</option>
                <option value={50}>50% Discount</option>
              </select>
              {errors.discountPercentage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.discountPercentage.message}
                </p>
              )}

              <label
                htmlFor="category"
                className="self-start text-xs font-semibold"
              >
                Category Name
              </label>
              <select
                {...register("category", {
                  required: "Category Name is required",
                })}
                id="category"
                className={`flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2 ${
                  errors.category && "border-red-500"
                }`}
              >
                <option value="" disabled>
                  Select Category Name
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.categoryName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoryName.message}
                </p>
              )}

              <label
                htmlFor="email"
                className="self-start text-xs font-semibold"
              >
                Email
              </label>
              <input
                {...register("sellerEmail")}
                readOnly
                id="email"
                type="email"
                className="flex items-center border-2 h-12 px-4 mt-2 rounded  focus:outline-none focus:ring-2"
              />

              <button
                type="submit"
                className="flex items-center justify-center h-12 px-6 mt-8 text-sm bg-custom-custom rounded btn font-bold"
              >
                Update Info
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-red-300" onClick={closeModal}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCategory;
