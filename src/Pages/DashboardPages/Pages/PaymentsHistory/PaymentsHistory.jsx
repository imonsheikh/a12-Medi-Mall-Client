import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import usePaymentDetails from "../../../../Hooks/usePaymentDetails";
import { Helmet } from "react-helmet-async";

const PaymentsHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments] = usePaymentDetails();
  const userPayments = payments.filter(
    (paymentData) =>
      paymentData.sellerEmail && paymentData.sellerEmail.includes(user.email)
  );
  return (
    <div>
        <Helmet><title>Payment History</title></Helmet>
      <div className="text-center py-7 lg:py-14">
        <h1 className=" text-3xl lg:text-5xl">YOUR PAYMENT HISTORY</h1>
      </div>
      <div>
        <div className=" max-w-[1000px] mx-auto mt-4">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-custom-custom text-white">
                <th>#</th>
                <th className=" lg:text-xl">Payment ID</th>
                <th className=" lg:text-xl">Amount</th>
                <th className=" lg:text-xl">Date</th>
                <th className=" lg:text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {userPayments.map((payment, index) => (
                <tr key={payment._id}>
                  <td className=" text-sm lg:text-base">{index + 1}</td>
                  <td className=" text-sm lg:text-base">{payment.paymentIntentId}</td>
                  <td className=" text-sm lg:text-base">${payment.amount / 100}</td>
                  <td className=" text-sm lg:text-base">
                    {payment.date ? payment.date.split("T")[0] : "N/A"}
                  </td>
                  <td className=" text-sm lg:text-base">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHistory;
