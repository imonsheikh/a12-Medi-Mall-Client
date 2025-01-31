import toast from "react-hot-toast";
import CommonButton from "../../../Component/CommonButton";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import usePublicAxios from "../../../Hooks/usePublicAxios";
import useCart from "../../../Hooks/useCart";

// eslint-disable-next-line react/prop-types
const DiscountPerCard = ({product}) => {
    const {user} = useContext(AuthContext)
    const axiosPublic = usePublicAxios();
    const [carts, refetch] = useCart()
    console.log(carts);
    // eslint-disable-next-line react/prop-types
    const {medicineName, genericName, medicineImage, discountPercentage, perUnitPrice} = product;
    const discountedPrice = perUnitPrice / 100 * discountPercentage;
    const afterDiscountPrice = perUnitPrice - discountedPrice;
    const lastDiscounted = afterDiscountPrice.toFixed(2);


    const handleAddCart = async (medicine) => {
        if(!user){
          return toast.error('login fast !')
        }
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
          console.log(res.data);
          toast.success('Successfully added!');
          refetch();
        } catch (error) {
          toast.error(error.message);
        }
      };
    return (
        <div className=" bg-orange-50 pt-12 pb-9 rounded-lg ">
            <div className="flex flex-col justify-center items-center">
                <h3 className=" text-lg lg:text-xl font-medium">{medicineName}</h3>
                <h1 className={`text-xl lg:text-2xl font-semibold`}>{genericName}</h1>
                <div className=" relative mt-7">
                <div className=" flex justify-center items-center  bg-orange-100 lg:w-72 w-52 h-52 lg:h-72 rounded-full ">
                    <img className=" w-44 lg:w-62" src={medicineImage} alt="" />
                </div>
                <div className=" absolute -top-3 -left-3 bg-custom-custom w-16 lg:w-24  p-5 flex justify-center items-center rounded-full">
                <p className=" text-xl lg:text-2xl font-bold text-white">{discountPercentage}% <br /> <span className=" text-xl font-normal">OFF</span></p>
                </div>
                </div>
                <div className=" flex justify-between items-center w-full lg:px-14 px-7 mt-6">
                <div className=" flex  gap-3">
                    <p className="  text-lg font-semibold line-through">${perUnitPrice}</p>
                    <p className=" text-3xl font-medium text-custom-custom">${lastDiscounted}</p>
                </div>
                <div onClick={()=>handleAddCart(product)}>
                <CommonButton textSize={'text-sm'} />
                </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountPerCard;