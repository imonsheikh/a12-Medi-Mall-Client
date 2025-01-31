
import TotalSale from "../TotalSale/TotalSale";
import SellerHome from "../SellerHome/SellerHome";
import UserHome from "../../UserHome/UserHome";
import useAdmin from "../../../../Hooks/useAdmin";
import useSeller from "../../../../Hooks/useSeller";

const DashboardHome = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();

  return (
    <div>
      {isAdmin && <TotalSale />}
      {isSeller && <SellerHome />}
      {!isAdmin && !isSeller && <UserHome />}
    </div>
  );
};

export default DashboardHome;
