/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

// eslint-disable-next-line react/prop-types
const CartItem = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const [carts, refetch] = useCart();
  console.log(carts);
  const {
    medicineImage,
    genericName,
    category,
    medicineCompany,
    massUnit,
    perUnitPrice,
    quantity,
    _id
  } = product;

  const handleDeleteMedicine = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/cart/${_id}`);
          if (response.data.deletedCount === 1) {
            Swal.fire("Deleted!", "Item deleted successfully!", "success");
            refetch();
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire("Error!", "Failed to delete the item.", "error");
        }
      }
    });
  };

  const handleIncreaseQuantity = async (_id) => {
    try {
      const response = await axiosSecure.patch(`/cart/${_id}/increase`);
      if (response.data.modifiedCount === 1) {
        refetch();
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
      Swal.fire("Error!", "Failed to increase the quantity.", "error");
    }
  };

  const handleDecreaseQuantity = async (_id) => {
    try {
      if (quantity > 1) {
        const response = await axiosSecure.patch(`/cart/${_id}/decrease`);
        if (response.data.modifiedCount === 1) {
          refetch();
        }
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      Swal.fire("Error!", "Failed to decrease the quantity.", "error");
    }
  };

  return (
    <div>
      <div className="card card-side flex flex-col lg:flex-row  border-2">
        <figure className="w-72">
          <img className="w-full" src={medicineImage} alt={genericName} />
        </figure>
        <div className="card-body">
          <div>
            <div className="flex md:flex-row flex-col justify-between">
              <div>
                <h3 className="text-2xl mb-2">{genericName}</h3>
              </div>
              <div>
                <h2 className="font-semibold text-custom-custom">{category}</h2>
              </div>
            </div>
            <h2 className="text-xl">
              <span className="text-xl font-semibold">Company:</span> {medicineCompany}
            </h2>
            <h1 className="text-lg mt-6">
              <span className="font-semibold">Mass Unit:</span> {massUnit}
            </h1>
            <h1 className="text-lg">
              <span className="font-semibold">Per Unit Price:</span> ${perUnitPrice}
            </h1>
          </div>
          <div className="card-actions justify-end items-center">
            <div className="flex items-center mr-5 gap-4">
              <p onClick={() => handleDecreaseQuantity(_id)} className="text-xl btn">-</p>
              <p className="text-xl btn">{quantity}</p>
              <p onClick={() => handleIncreaseQuantity(_id)} className="text-xl btn">+</p>
            </div>
            <div>
              <button onClick={() => handleDeleteMedicine(_id)} className="btn bg-custom-custom text-lg text-white">
                Remove Item!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
