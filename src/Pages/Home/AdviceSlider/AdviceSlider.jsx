import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight } from "react-icons/fa6";

// import required modules
import { Navigation } from "swiper/modules";
import UseAdvice from "../../../Hooks/UseAdvice";
import CommonButton from "../../../Component/CommonButton";

const AdviceSlider = () => {
  const [advices] = UseAdvice();
  const showAdd = advices.filter(advice=> advice.status === 'accept')
  return (
    <>
      <Swiper autoplay={true} navigation={true} modules={[Navigation]} className="mySwiper">
        {showAdd.map((advice) => (
          <SwiperSlide key={advice}>
            <div className="hero lg:my-20">
              <div className="hero-content flex-col justify-between lg:flex-row-reverse">
                <div className=" lg:h-[400px] lg:w-[500px]">
                <img
                  src={advice.adviceImage}
                  className=""
                />
                </div>
                <div className=" md:w-1/2 space-y-4 ">
                  <h1 className="lg:text-7xl text-3xl font-bold">{advice.title}</h1>
                  <p className=" text-base lg:text-lg font-medium">
                    {advice.details}
                  </p>
                  <p className=" text-2xl lg:text-3xl font-semibold text-custom-custom ">
                    ${advice.price}
                  </p>
                  <div className=" flex item-center gap-6 pt-4">
                    <button className="btn rounded-md bg-custom-custom text-lg text-white">
                      Buy Now{" "}
                      <span>
                        <FaArrowRight />
                      </span>{" "}
                    </button>
                    <CommonButton textSize={'text-lg'} />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default AdviceSlider;
