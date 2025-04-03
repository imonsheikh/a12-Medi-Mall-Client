import { Link } from "react-router-dom";
import SectionHead from "../../../Component/SectionHead";
import UseCategory from "../../../Hooks/UseCategory";
import useProducts from "../../../Hooks/useProducts";  
import medicine from '../../../assets/medicine2.jpg';

const CategorySection = () => {
    const [categories] = UseCategory();
    const [medicines] = useProducts();

    return (
        <div className="max-w-[1440px] mx-auto mt-20 px-4">
            {/* Section Header */}
            <div className="text-center mb-10">
                <SectionHead top="WHAT ARE YOU LOOKING FOR?" text="SHOP BY CATEGORIES" />
            </div>  

            {/* Flex Container */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
                
                {/* Left Side - Categories */}
                <div className="w-full lg:w-1/2 mt-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {categories.map(category => (
                            <Link 
                                to={`/categories/${category.categoryName}`}  
                                key={category.categoryName}
                                className="relative group overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            >
                                {/* Background Glow Effect */}
                                <div className="absolute inset-0 bg-blue-400 opacity-10 transition-all duration-500 group-hover:opacity-40 blur-lg"></div>
                                
                                {/* Category Image */}
                                <img className="mb-4 w-20 transition-transform duration-300 group-hover:scale-110" src={category.image} alt={category.categoryName} />
                                
                                {/* Category Name */}
                                <h1 className="text-2xl text-center font-semibold text-gray-800">{category.categoryName}</h1>

                                {/* Category Count */}
                                <p className="text-lg font-semibold text-white bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-110">
                                    {medicines.filter(medicine => medicine.category === category.categoryName).length}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <img className="max-w-full h-auto object-cover rounded-lg shadow-lg" src={medicine} alt="medical" />
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
