import { Link } from "react-router-dom";
import SectionHead from "../../../Component/SectionHead";
import UseCategory from "../../../Hooks/UseCategory";
import useProducts from "../../../Hooks/useProducts";

const CategorySection = () => {
    const [categories] = UseCategory()
    console.log(categories);
    const [medicines] = useProducts()
  
    return (
        <div className=" flex flex-col-reverse lg:flex-row-reverse  lg:items-start items-center justify-between  max-w-[1440px] mt-[90px] mx-auto">
            <div className=" mt-5">
                <div>
                    <SectionHead top={'WHAT ARE YOU LOOKING FOR?'} text={'SHOP BY CATEGORIES'} />
                </div>
                <div className=" grid grid-cols-2 mx-5 md:grid-cols-3 gap-2 lg:gap-5 mt-12">
                    {
                        categories.map(category => <Link to={`/categories/${category.categoryName}`}  className=" hover:shadow-lg lg:w-[240px] py-12 bg-blue-50 space-y-2  flex flex-col justify-center items-center" key={category} >
                            <img className=" mb-5 w-16" src={category.image} alt="" />
                            <h1 className=" text-2xl text-center font-semibold">{category.categoryName}</h1>
                            <p className=" text-xl font-semibold text-custom-custom">{medicines.filter(medicine => medicine.category === category.categoryName).length}</p>
                        </Link>)
                    }
                </div>
            </div>
            <div>
                <img className=" lg:w-full md:w-[500px] w-[250px]" src="https://i.ibb.co/v4YPmxQ/banner-category-1-1.png" alt="" />
            </div>
        </div>
    );
};

export default CategorySection;