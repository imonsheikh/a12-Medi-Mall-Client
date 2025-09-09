import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import navLogo from '../../../assets/navLogo.png';
import useCart from "../../../Hooks/useCart";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [carts, refetch] = useCart();


  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 0) {
        navbar.classList.add('shadow-lg'); 
      } else {
        navbar.classList.remove('shadow-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLink = (
    <>
      <p>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-custom-custom mr-6 text-white p-[6px] px-3 rounded-md  font-semibold text-lg"
              : isPending
              ? "pending "
              : "text-lg mr-6 font-bold"
          }
          to="/"
        >
          HOME
        </NavLink>
      </p>
      <p>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? " bg-custom-custom mr-6 text-white p-[6px] px-3 rounded-md  font-semibold text-lg "
              : isPending
              ? "pending"
              : " text-lg mr-6   font-bold"
          }
          to="/shop"
        >
          {" "}
          SHOP
        </NavLink>
      </p>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? " w-11 relative bg-orange-100 p-1 rounded-full "
            : isPending
            ? "pending"
            : " text-lg relative mr-6 w-11  font-bold"
        }
        to={"/carts"}
      >
        <img src="https://i.ibb.co/gMkPbpN/buy-1.png" alt="" />
        <p className=" bg-red-500 text-white  absolute top-[-8px] right-[-10px] rounded-full px-1">
          {carts.length}
        </p>
      </NavLink>
    </>
  );

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success('Successfully logged out!');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <div id="navbar" className="navbar sticky top-0 z-40 lg:px-[180px] h-[80px] bg-custom-custom">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu space-y-5  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLink}
          </ul>
        </div>
        <Link to='/'><img className=" w-[250px]" src={navLogo} alt="" /></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center">
          {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        <details className="dropdown mr-10 lg:block hidden">
          <summary className="m-1 text-lg underline font-semibold cursor-pointer">Language</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
            <li><a>English</a></li>
            <li><a>Bangla</a></li>
          </ul>
        </details>
        {
          user ? (
            <div className="dropdown dropdown-end pr-3">
              <div tabIndex={0} role="button" className="">
                <div className="avatar">
                  <div className="w-12 rounded-full ring ring-offset-2 ring-custom-secondary">
                    <img src={user.photoURL} alt="User Avatar" />
                  </div>
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li className=" text-lg"><NavLink to="/update-profile" >Update Profile</NavLink></li>
                <li className=" text-lg">
                <NavLink to={
                    '/dashboard/home'
                  }>
                    Dashboard
                  </NavLink>
                </li>
                <li onClick={handleLogout}><a className=" text-lg">LogOut!</a></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="= py-1 md:px-5 bg-transparent border-2 text-white hover:bg-custom-custom hover:text-white text-lg px-3 md:text-2xl font-semibold rounded-md border-custom-custom">
              Join US
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
