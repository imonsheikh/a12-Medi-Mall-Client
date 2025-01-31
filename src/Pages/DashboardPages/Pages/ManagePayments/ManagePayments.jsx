import toast from 'react-hot-toast';
import usePaymentDetails from '../../../../Hooks/usePaymentDetails';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const ManagePayments = () => {
  const [payments, refetch] = usePaymentDetails();
  const axiosSecure = useAxiosSecure();

  const handleAcceptPayment = async (paymentId) => {
    try {
      const res = await axiosSecure.patch(`/payment-history/${paymentId}/accept`, { status: 'paid' });
      if (res.data.message === "Payment status updated to 'paid'") {
        toast.success('Payment status updated to paid');
        refetch();
      } else {
        toast.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Failed to update payment status:', error);
      toast.error('Failed to update payment status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet><title>Manage Payment</title></Helmet>
      <div className="text-center py-7 lg:py-14">
        <h1 className=" text-3xl lg:text-5xl">Manage Payments</h1>
      </div>
      <div className="mx-auto p-8 max-w-[1200px] mt-10 bg-white">
        <div className=' flex justify-between mb-4'>
            <h1 className=' text-base lg:text-2xl'>Total Paid: {payments.filter(payment => payment.status === 'paid').length}</h1>
            <h1 className=' text-base lg:text-2xl'>Total Pending: {payments.filter(payment => payment.status === 'pending').length}</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-custom-custom text-white">
                <th className="lg:text-xl">Payment ID</th>
                <th className="lg:text-xl">User</th>
                <th className="lg:text-xl">Amount</th>
                <th className="lg:text-xl">Status</th>
                <th className="text-center lg:text-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className=' text-sm lg:text-base'>{payment.paymentIntentId}</td>
                  <td className=' text-sm lg:text-base'>{payment.email}</td>
                  <td className=' text-sm lg:text-base'>${payment.amount / 100}</td>
                  <td className=' text-sm lg:text-base'>{payment.status}</td>
                  <td className="flex justify-center space-x-4">
                    {payment.status === 'pending' && (
                      <button
                        onClick={() => handleAcceptPayment(payment._id)}
                        className="btn px-4 py-2 bg-green-300 text-white hover:bg-green-400"
                      >
                        Accept Payment
                      </button>
                    )}
                    {
                        payment.status === 'paid' && (
                            <button
                              className="btn btn-disabled px-4 py-2 bg-green-300 text-white hover:bg-green-400"
                            >
                              Paid
                            </button>
                          )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePayments;
