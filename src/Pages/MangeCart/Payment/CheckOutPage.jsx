import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckOutFrom';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckoutPage = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0; 
  // console.log(totalAmount);
  

  return (
    <div className=" px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>
          MediMall || CheckOut
        </title>
      </Helmet>
      <div className="bg-gray-50 py-12 text-center">
        <h1 className=" text-3xl lg:text-5xl">CheckOut Your Payment</h1>
      </div>
      <h1 className=' text-center mt-16 text-xl'><span className=' font-semibold'>Total Amount:</span> ${totalAmount}</h1>
      <div className="max-w-2xl mt-5 mb-10  mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
        <Elements stripe={stripePromise}>
          <CheckoutForm totalAmount={totalAmount} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
