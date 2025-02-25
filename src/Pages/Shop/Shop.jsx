import { Helmet } from "react-helmet-async";
import { RiSearchLine } from "react-icons/ri";
import useProducts from "../../Hooks/useProducts";
import { FaCartArrowDown } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { FaArrowUp91 } from "react-icons/fa6";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext, useEffect, useState } from "react";
import usePublicAxios from "../../Hooks/usePublicAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [products] = useProducts();
  const [carts, refetch] = useCart();
  console.log(carts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const axiosPublic = usePublicAxios();
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    setMedicines(products);
    setFilteredMedicines(products);
  }, [products]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = medicines.filter(
      (medicine) =>
        medicine.medicineName.toLowerCase().includes(query) ||
        medicine.genericName.toLowerCase().includes(query) ||
        medicine.medicineCompany.toLowerCase().includes(query) ||
        medicine.category.toLowerCase().includes(query) ||
        medicine.shortDescription.toLowerCase().includes(query) 
    );
    setFilteredMedicines(filtered);
    setCurrentPage(1);
  }, [searchQuery, medicines]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    document.getElementById("my_modal_3").showModal();
  };

  const handleAddCart = async (medicine) => {
    if (!user) {
      return toast.error("login fast !");
    }
    setLoading(true);
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
      sellerEmail: medicine.sellerEmail,
      quantity: 1,
    };
    try {
      const res = await axiosPublic.post("/cart", product);
      setLoading(false);
      console.log(res.data);
      toast.success("Successfully added!");
      refetch();
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleLowToHigh = () => {
    const sortedProducts = [...filteredMedicines].sort((a, b) => a.perUnitPrice - b.perUnitPrice);
    setFilteredMedicines(sortedProducts);
  };

  const handleHighToLow = () => {
    const sortedProducts = [...filteredMedicines].sort((a, b) => b.perUnitPrice - a.perUnitPrice);
    setFilteredMedicines(sortedProducts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const currentItems = filteredMedicines.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <Helmet>
        <title>MediMall || Shop</title>
      </Helmet>
      <div className="bg-gray-50">
        <div className="flex py-6 pt-12 pl-9 gap-4 items-end max-w-[1540px] mx-auto">
          <h1 className=" text-3xl lg:text-6xl">All Medicine</h1>
          <p className="text-lg text-custom-custom">Shop now...</p>
        </div>
      </div>
      <div className="max-w-[1540px] mt-16 flex justify-center mx-auto">
        <div className="">
          <label className="input lg:w-[400px] input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search Medicine"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="text-3xl text-custom-custom">
              <RiSearchLine />
            </span>
          </label>
        </div>
      </div>
      <div className="mt-7 max-w-[1400px] mx-auto">
        <div className="">
          <>
            <div className="flex justify-center md:justify-end md:mt-[-40px]">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-base btn bg-transparent"
                >
                  Sort by Price <FaArrowUp91 />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li onClick={handleLowToHigh}>
                    <a>Low to High</a>
                  </li>
                  <li onClick={handleHighToLow}>
                    <a>High to Low</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="overflow-x-auto mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-lg">Name</th>
                      <th className="text-lg">Category</th>
                      <th className="text-lg">Company</th>
                      <th className="text-lg">Per Unit Price</th>
                      <th className="text-lg text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((product, index) => (
                      <tr key={product._id} className="hover">
                        <th className="">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </th>
                        <td className="text-lg">{product.medicineName}</td>
                        <td className="text-base">{product.category}</td>
                        <td className="text-base">{product.medicineCompany}</td>
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
                            {loading ? (
                              <span className="loading w-5 loading-spinner text-white"></span>
                            ) : <> 
                              <p>Select</p>
                              <FaCartArrowDown />
                              
                              </>}
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
              <div className="flex justify-center mb-4 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`btn mr-3 bg-transparent text-lg  border-2 border-custom-custom  ${
                      currentPage === i + 1 ? "btn-active" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
      {selectedProduct && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box max-w-fit">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex lg:flex-row flex-col gap-4 p-8 justify-center items-center w-fit">
              <img
                src={selectedProduct.medicineImage}
                alt="Shoes"
                className="rounded-xl w-52"
              />
              <div className="">
                <h3 className="text-2xl font-bold">
                  {selectedProduct.medicineName}
                </h3>
                <p className="py-4 max-w-lg text-lg">
                  {selectedProduct.shortDescription.slice(0,130)}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Generic Name: </span>
                  {selectedProduct.genericName}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Brand Name: </span>
                  {selectedProduct.medicineName}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Category: </span>
                  {selectedProduct.category}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Mass: </span>
                  {selectedProduct.massUnit}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Price: </span>
                  ${selectedProduct.perUnitPrice}
                </p>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Shop;
