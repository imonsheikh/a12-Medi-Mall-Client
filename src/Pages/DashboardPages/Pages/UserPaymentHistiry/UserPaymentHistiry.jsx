import { useContext } from "react";
import usePaymentDetails from "../../../../Hooks/usePaymentDetails";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const UserPaymentHistiry = () => {
    const [payments] = usePaymentDetails();
    const { user } = useContext(AuthContext);
    const totalPayments = payments.filter(payment => payment.email === user.email);
    console.log(totalPayments);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="text-center py-14">
                <h1 className="text-5xl">PAYMENT HISTORY</h1>
            </div>
            <div className="mx-auto p-8 max-w-[1200px] mt-10 bg-white">
                <div className='flex justify-between mb-4'>
                    <h1 className='text-2xl'>Total Paid: {totalPayments.filter(payment => payment.status === 'paid').length}</h1>
                    <h1 className='text-2xl'>Total Pending: {totalPayments.filter(payment => payment.status === 'pending').length}</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-custom-custom text-white">
                                <th>#</th>
                                <th className="text-xl">Payment ID</th>
                                <th className="text-xl">Amount</th>
                                <th className="text-xl">Date</th>
                                <th className="text-xl">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalPayments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td className="text-base">{index + 1}</td>
                                    <td className='text-base'>{payment.paymentIntentId}</td>
                                    <td className='text-base'>${payment.amount / 100}</td>
                                    <td className='text-base'>{payment.date ? payment.date.split('T')[0] : 'N/A'}</td>
                                    <td className='text-base'>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserPaymentHistiry;
