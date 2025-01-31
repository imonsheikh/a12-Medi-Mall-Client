import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import usePaymentDetails from "../../../../Hooks/usePaymentDetails";
import { Helmet } from "react-helmet-async";

const SellerHome = () => {
  const { user } = useContext(AuthContext);
  const [payments] = usePaymentDetails();
  const userPayments = payments.filter(
    (paymentData) =>
      paymentData.sellerEmail && paymentData.sellerEmail.includes(user.email)
  );
  const paidUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "paid"
  );

  const pendingUserPayments = userPayments.filter(
    (paymentData) => paymentData.status === "pending"
  );
  const totalPaidPrice = paidUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.amount / 100),
    0
  );

 const totalPendingPrice = pendingUserPayments.reduce(
    (total, paymentData) => total + parseFloat(paymentData.amount / 100),
    0
  );

  return (
    <div>
        <Helmet><title>Seller || Home</title></Helmet>
      <div className="text-center py-14">

        <h1 className=" text-3xl lg:text-5xl">WellCome Seller: {user.displayName}</h1>
      </div>
     <div className=" flex lg:flex-row flex-col justify-center items-center gap-7 mt-10">
        <div className=" bg-green-200 p-12 text-center space-y-2">
            <h1 className=" text-3xl">PAID TOTAL:</h1>
            <h2 className="text-3xl">${totalPaidPrice.toFixed(2)}</h2>
        </div>
        <div className=" bg-red-200 p-12 text-center space-y-2">
            <h1 className=" text-3xl">PENDING TOTAL:</h1>
            <h1 className=" text-3xl">${totalPendingPrice.toFixed(2)}</h1>
        </div>
     </div>
    </div>
  );
};

export default SellerHome;
