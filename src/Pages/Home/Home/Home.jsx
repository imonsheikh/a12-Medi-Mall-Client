import { Helmet } from "react-helmet-async";
import UseAdvice from "../../../Hooks/UseAdvice";
import AdviceSlider from "../AdviceSlider/AdviceSlider";
import Blogs from "../Blogs/Blogs";
import CategorySection from "../CategorySection/CategorySection";
import DiscountProducts from "../DiscountProducts/DiscountProducts";
import NewsLatter from "../NewaLatter/NewsLatter";

const Home = () => {
    const [advices, refetch, isLoading] = UseAdvice();
    // console.log(advices, refetch);
    if(isLoading) {
        return <div className=" min-h-screen flex justify-center items-center">
        <span className="loading mt-28 loading-infinity w-[50px] md:w-[100px] text-custom-custom"></span>
    </div>
    }
    return (
        <div>
            <Helmet>
                <title>MediMall || Home</title>
            </Helmet>
            <div className=" bg-base-200">
            <div className=" max-w-[1540px] mx-auto">
            <AdviceSlider/>
            </div>
            </div>
            <CategorySection/>
            <DiscountProducts/>
            <Blogs/>
            <div>
                <NewsLatter/>
            </div>
        </div>
    );
};

export default Home;