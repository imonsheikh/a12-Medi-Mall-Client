import { useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { FaCartArrowDown } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import CommonButton from "../../Component/CommonButton";
import useCart from "../../Hooks/useCart";
import usePublicAxios from "../../Hooks/usePublicAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const CategoryDetails = () => {
    const { categoriesName } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products] = useProducts();

    const { user } = useContext(AuthContext);
    const [carts, refetch] = useCart();
    console.log(carts);
    const axiosPublic = usePublicAxios();
    const categoryMedicine = products.filter(product => product.category === categoriesName);
    console.log(categoryMedicine);


    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        document.getElementById("my_modal_3").showModal();
      };

      const handleAddCart = async (medicine) => {
        if(!user){
          return toast.error('login fast !')
        }
        const product = {
          medicineName: medicine.medicineName,
          genericName: medicine.genericName,
          shortDescription: medicine.shortDescription,
          medicineImage: medicine.medicineImage,
          category: medicine.category,
          medicineCompany: medicine.medicineCompany,
          massUnit: medicine.massUnit,
          perUnitPrice: medicine.perUnitPrice,
          discountPercentage: medicine.discountPercentage,
          userEmail: user.email,
          quantity: 1,
        };
        try {
          const res = await axiosPublic.post("/cart", product);
          console.log(res.data);
          toast.success('Successfully added!');
          refetch();
        } catch (error) {
          toast.error(error.message);
        }
      };
    return (
        <div className=" max-w-[1540px] mx-auto">
            <Helmet>
                <title>
                    Medimall || Category
                </title>
            </Helmet>
           <div className=" py-12 bg-gray-50 text-center">
            <h1 className=" text-5xl"><span className=" uppercase">{categoriesName}</span> Medicines</h1>
           </div>

           <div className="overflow-x-auto mt-10 mb-32">
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="text-lg">Name</th>
                        <th className="text-lg">Category</th>
                        <th className="text-lg">Company</th>
                        <th className="text-lg">Unit Price</th>
                        <th className="text-lg text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryMedicine.map((product, index) => (
                        <tr key={product._id} className="hover">
                          <th className="">{index + 1}</th>
                          <td className="text-lg">{product.medicineName}</td>
                          <td className="text-base">{product.category}</td>
                          <td className="text-base">
                            {product.medicineCompany}
                          </td>
                          <td className="text-base font-semibold">
                            ${product.perUnitPrice}
                          </td>
                          <td className="flex justify-center items-center gap-5 text-base font-semibold">
                            <button
                              onClick={() => handleAddCart(product)}
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Add Cart"
                              className={`btn hover:text-white rounded-md bg-white text-custom-custom border-2 border-custom-custom hover:bg-custom-custom text-lg`}
                            >
                              
                                <FaCartArrowDown />
                              
                            </button>
                            <button
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="View Medicine"
                              className="btn hover:text-white rounded-md bg-white border-2 hover:bg-custom-custom text-xl"
                              onClick={() => handleViewProduct(product)}
                            >
                              <FiEye />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {selectedProduct && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box max-w-fit">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className=" grid items-center grid-cols-1 lg:grid-cols-2 p-10">
              <div className=" md:w-[400px]">
                <img
                  className=""
                  src={selectedProduct.medicineImage}
                  alt={selectedProduct.medicineName}
                />
              </div>
              <div className=" w-full">
                <div className=" flex justify-between mr-5">
                  <div className="">
                    <h1 className=" text-4xl">
                      {selectedProduct.medicineName}
                    </h1>
                    <h3 className=" text-xl mt-2">
                      {selectedProduct.genericName}
                    </h3>
                  </div>
                  <div>
                    <h2 className=" font-semibold text-custom-custom">
                      {selectedProduct.category}
                    </h2>
                  </div>
                </div>
                <h2 className=" text-xl mt-5">
                  <span className=" text-xl font-semibold ">Company:</span>{" "}
                  {selectedProduct.medicineCompany}
                </h2>
                <h1 className=" text-lg mt-6">
                  <span className=" font-semibold">Mas Unit:</span>{" "}
                  {selectedProduct.massUnit}
                </h1>
                <h1 className=" text-lg">
                  <span className=" font-semibold">Per Unit Price:</span> $
                  {selectedProduct.perUnitPrice}
                </h1>
                <h1 className=" text-lg">
                  <span className=" font-semibold">Discount:</span>{" "}
                  {selectedProduct.discountPercentage}%
                </h1>
                <div className=" mb-5 lg:w-[600px]">
                  <h1 className=" text-lg">
                    <span className=" font-semibold">Medicine Details:</span>{" "}
                    {selectedProduct.shortDescription.slice(0, 130)}
                  </h1>
                </div>
                <div className=" flex justify-end">
                  <CommonButton textSize={"text-lg"}></CommonButton>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
        </div>
    );
};

export default CategoryDetails;
