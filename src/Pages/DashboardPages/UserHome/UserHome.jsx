import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className=" min-h-screen flex justify-center items-center flex-col">
            <Helmet><title>User Home</title></Helmet>
            <h1 className=" text-3xl lg:text-6xl font-semibold text-custom-custom ">Welcome to Medi Mall</h1>
            <h1 className=" text-2xl lg:text-6xl font-semibold l text-blue-400 mt-4">{user.displayName}</h1>
        </div>
    );
};

export default UserHome;