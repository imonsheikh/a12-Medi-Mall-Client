import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar/Navbar";
import Footer from "../Component/Shared/Footer";
import { Toaster } from "react-hot-toast";

const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('invoice');


    return (
        <div className="min-h-screen flex flex-col">
            { noHeaderFooter || <Navbar></Navbar>}
            <div className="flex-grow">
            <Outlet></Outlet>
            </div>
            { noHeaderFooter || <Footer></Footer>}
            <Toaster />
        </div>
    );
};

export default Main;