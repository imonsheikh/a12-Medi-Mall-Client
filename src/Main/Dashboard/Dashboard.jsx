import { AiFillHome, AiFillShopping } from "react-icons/ai";
import { FaList, FaUsers } from "react-icons/fa";
import { IoCart, IoHomeSharp } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import navLogo from "../../assets/navLogo.png";
import { TbFileReport } from "react-icons/tb";
import { RiAdvertisementFill, RiAdvertisementLine } from "react-icons/ri";
import useAdmin from "../../Hooks/useAdmin";
import useSeller from "../../Hooks/useSeller";
import { TiThMenuOutline } from "react-icons/ti";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isSeller, isSellerLoading] = useSeller();

  if (isAdminLoading || isSellerLoading) {
    return <div>Loading...</div>;
  }

  const adminNav = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="/dashboard/home"
        >
          <div className="flex items-center gap-2">
            <p className="text-xl">
              <IoHomeSharp size={25} />
            </p>
            <p>ADMIN HOME</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="manage-user"
        >
          <div className="flex items-center gap-2">
            <p>
              <FaUsers size={25} />
            </p>
            <p>MANAGE USER</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="manage-category"
        >
          <div className="flex items-center gap-2">
            <p>
              <FaList size={23} />
            </p>
            <p>MANAGE CATEGORY</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="manage-payments"
        >
          <div className="flex items-center gap-2">
            <p>
              <MdOutlinePayments size={25} />
            </p>
            <p>MANAGE PAYMENTS</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="report-sale"
        >
          <div className="flex items-center gap-2">
            <p>
              <TbFileReport size={25} />
            </p>
            <p>SALES REPORTS</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="manage-advice"
        >
          <div className="flex items-center gap-2">
            <p>
              <RiAdvertisementLine size={25} />
            </p>
            <p>MANAGE BANNER ADVERTISE</p>
          </div>
        </NavLink>
      </li>
    </>
  );

  const sellerNav = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="/dashboard/home"
        >
          <div className="flex items-center gap-2">
            <p className="text-xl">
              <IoHomeSharp size={25} />
            </p>
            <p>SELLER HOME</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="manage-medicine"
        >
          <div className="flex items-center gap-2">
            <p>
              <FaList size={23} />
            </p>
            <p>MANAGE MEDICINE</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="payments-history"
        >
          <div className="flex items-center gap-2">
            <p>
              <MdOutlinePayments size={25} />
            </p>
            <p>PAYMENTS HISTORY</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="manage-add"
        >
          <div className="flex items-center gap-2">
            <p>
              <RiAdvertisementFill size={25} />
            </p>
            <p className="uppercase">advertizement</p>
          </div>
        </NavLink>
      </li>
    </>
  );

  const userNav = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="/dashboard/home"
        >
          <div className="flex items-center gap-2">
            <p className="text-xl">
              <IoHomeSharp size={25} />
            </p>
            <p>USER HOME</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="payment-history"
        >
          <div className="flex items-center gap-2">
            <p>
              <MdOutlinePayments size={25} />
            </p>
            <p>PAYMENTS HISTORY</p>
          </div>
        </NavLink>
      </li>
    </>
  );

  const bottomNav = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="/"
        >
          <div className="flex items-center gap-2">
            <p>
              <AiFillHome size={25} />
            </p>
            <p>HOME</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to={`/shop`}
        >
          <div className="flex items-center gap-2">
            <p>
              <AiFillShopping size={23} />
            </p>
            <p>SHOP</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-custom-custom font-bold font-inter text-base"
              : "text-base font-inter"
          }
          to="/carts"
        >
          <div className="flex items-center gap-2">
            <p>
              <IoCart size={25} />
            </p>
            <p>CART</p>
          </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="lg:sticky sticky top-0  z-40 lg:left-0 lg:top-0 px-8 bg-base-300 lg:w-[300px] w-full lg:h-screen">
        <img className="hidden lg:block" src={navLogo} alt="" />
        <div className="px-1 mt-5">
          <ul className="space-y-6 border-b-4 border-black pb-10 lg:block hidden">
            {isAdmin ? (
              adminNav
            ) : isSeller ? (
              sellerNav
            ) : (
              userNav
            )}
          </ul>
          <ul className="space-y-6 pt-10 lg:block hidden">{bottomNav}</ul>
        </div>
        <div className="lg:hidden flex px-4 py-3  ">
          
          <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className=" flex justify-between drawer-content">
            <img className=" w-[120px]" src={navLogo} alt="" />
            <label htmlFor="my-drawer" className=" drawer-button "><TiThMenuOutline size={25} /></label>
          </div> 
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-[280px] min-h-full bg-base-200 text-base-content">
              <img className=" w-[200px] mb-4" src={navLogo} alt="" />
            {isAdmin ? (
              adminNav
            ) : isSeller ? (
              sellerNav
            ) : (
              userNav
            )}
            <li className=" py-5 border-t-4"></li>
            {bottomNav}
            </ul>
            
          </div>
        </div>
        </div>

      </div>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
