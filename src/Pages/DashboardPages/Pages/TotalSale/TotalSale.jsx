import { Helmet } from "react-helmet-async";
import usePaymentDetails from "../../../../Hooks/usePaymentDetails";

const TotalSale = () => {
    const [payments] = usePaymentDetails();
    const totalAmountInCents = payments.reduce((total, payment) => total + payment.amount, 0);
    const totalAmountInDollars = totalAmountInCents / 100;

    const pending = payments.filter(payment => payment.status === 'pending')
    const paid = payments.filter(payment => payment.status === 'paid')

    return (
        <div className=" bg-gray-100">
            <Helmet>
                <title>Admin Statics</title>
            </Helmet>
            <div className="  grid lg:grid-cols-4 grid-cols-1 justify-center items-center min-h-screen ">
                <div className=" bg-orange-400 rounded-2xl text-center p-6 m-4 ">
                    <h1 className=" text-3xl">Total Sales:</h1>
                    <h2 className=" text-3xl mt-2">{payments.length}</h2>
                </div>
                <div className=" bg-gradient-to-r from-blue-300 to-orange-200 rounded-2xl text-center p-6 m-4 ">
                    <h1  className=" text-3xl">Total Sales Revenue:</h1>
                    <h2  className=" text-3xl mt-2">${totalAmountInDollars.toFixed(2)}</h2>
                </div>
                <div className=" bg-lime-200 rounded-2xl text-center p-6 m-4 ">
                    <h1 className=" text-3xl">Total Pending:</h1>
                    <h2 className=" text-3xl mt-2">{pending.length}</h2>
                </div>
                <div className=" bg-indigo-300 rounded-2xl text-center p-6 m-4 ">
                    <h1 className=" text-3xl">Total Paid:</h1>
                    <h2 className=" text-3xl mt-2">{paid.length}</h2>
                </div>
               
            </div>
        </div>
    );
};

export default TotalSale;
