import { useContext, useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useCart from "../../../Hooks/useCart";
import moment from "moment/moment";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ totalAmount }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false); 
  const [clientSecret, setClientSecret] = useState()
  const [carts, refetch] = useCart()

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    } 
    if(totalAmount > 0){
      axiosSecure.post("/create-payment-intent", {
        amount: totalAmount,
        email: user.email
      })
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      }) 

    }

  }, [totalAmount, user, loading, navigate, axiosSecure]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true); 
   
    //Validation 
       if(!stripe || !elements ){
        return 
       }   

       const card = elements.getElement(CardElement) 

       if(card === null){
           return
       } 

    try {  

       //1.CreatePayment
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card
    }) 
    if(error){
      console.log('payment error', error);
      setError(error.message)
    }else{
      console.log('payment method', paymentMethod);
      setError('')
    } 
 

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true); 
        console.log("Payment succeeded:", payload.paymentIntent);

        // const currentDate = new Date().toISOString();

        await axiosSecure.post("/save-payment-details", {
          paymentIntent: payload.paymentIntent,
          userEmail: user.email,
          status: 'pending',
          date: moment().format('MM/DD/YYYY'),
          sellerEmail: carts.map(item => item.sellerEmail),
          medicineName:carts.map(item=>item.medicineName),
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Payment Successful!",
          showConfirmButton: false,
          timer: 1500,
        }); 
        refetch()
        navigate("/invoice", {
          state: { paymentIntent: payload.paymentIntent },
        });
      }
    } catch (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    }
  };

  if (!user) {
    return <p>Loadng...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>

      <CardElement />
      <div className="flex justify-center mt-5">
        <button className="mt-8 btn text-lg bg-custom-custom text-white" disabled={processing || succeeded} type="submit">
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </div>
      {error && <div className=" text-red-400">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
