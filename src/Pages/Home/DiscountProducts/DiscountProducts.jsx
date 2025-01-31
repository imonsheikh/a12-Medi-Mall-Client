import SectionHead from "../../../Component/SectionHead";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation, Pagination } from "swiper/modules";
import useProducts from "../../../Hooks/useProducts";
import DiscountPerCard from "./DiscountPerCard";

const DiscountProducts = () => {
  const [products] = useProducts();
  const discounts = products.filter(
    (product) => product.discountPercentage > 0
  );

  return (
    <div className="mt-[80px] max-w-[1540px] mx-auto">
      <div className="mb-8">
        <SectionHead
          top={"Best Deal For You"}
          text={"DISCOUNT PRODUCTS"}
        ></SectionHead>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {discounts.map((product) => (
          <SwiperSlide key={product.medicineName}>
            <DiscountPerCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountProducts;
