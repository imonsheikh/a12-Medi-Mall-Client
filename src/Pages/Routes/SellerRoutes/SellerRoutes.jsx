import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../../../Hooks/useSeller";

// eslint-disable-next-line react/prop-types
const SellerRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller()
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default SellerRoutes;