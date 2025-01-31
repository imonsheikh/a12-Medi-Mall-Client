import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import CartItem from "./CartItem";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageCart = () => {
  const [carts, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClearCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete("/cart", { params: { email: user.email } });
          if (response.data.deletedCount > 0) {
            Swal.fire("Cleared!", "Your cart has been cleared.", "success");
            refetch();
          }
        } catch (error) {
          console.error("Error clearing cart:", error);
          Swal.fire("Error!", "Failed to clear the cart.", "error");
        }
      }
    });
  };

  const handleCheckout = () => {
    const totalAmount = carts.reduce((acc, product) => acc + (product.perUnitPrice * product.quantity), 0);
    navigate('/checkout', { state: { totalAmount } });
  };

  return (
    <div>
      <Helmet>
        <title>MediMall || Carts</title>
      </Helmet>
      <div className="bg-gray-50 py-12 text-center">
        <h1 className="text-3xl lg:text-5xl">Your Medicine Carts</h1>
      </div>
      <div className="max-w-[1340px] my-10 mx-auto">
        <div className="flex justify-end items-center gap-5 my-5">
          <button
            onClick={handleClearCart}
            className="bg-red-400 text-lg text-white btn"
          >
            Clear Cart!
          </button>
          <button onClick={handleCheckout} className="bg-green-200 text-lg btn">CheckOut -</button>
        </div>
        <div className="space-y-5">
          {carts.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCart;
