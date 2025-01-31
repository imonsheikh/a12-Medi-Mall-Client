import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className=" flex flex-col justify-center items-center min-h-screen">
            <h1 className=" md:text-4xl font-semibold mb-3 text-2xl">Page Not Found !!</h1>
            <img src="https://cdn.dribbble.com/users/1138875/screenshots/4669703/media/37be7c1818f5542ec069c9bd7b2adb2b.gif" alt="" />
            <Link to="/"><button className=" btn text-lg">Go to Home</button></Link>
        </div>
    );
};

export default ErrorPage;