import { createBrowserRouter } from "react-router-dom";
import Main from "../../Main/Main";
import Home from "../Home/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Shop from "../Shop/Shop";
import CategoryDetails from "../CategoryDetails/CategoryDetails";
import ManageCart from "../MangeCart/ManageCart";
import CheckoutPage from "../MangeCart/Payment/CheckOutPage";
import InvoicePage from "../InvoicePage/InvoicePage";
import Dashboard from "../../Main/Dashboard/Dashboard";
import ManageUser from "../DashboardPages/Pages/ManageUser/ManageUser";
import ManageCategory from "../DashboardPages/Pages/ManageCategory/ManageCategory";
import ManagePayments from "../DashboardPages/Pages/ManagePayments/ManagePayments";
import ManageAdvice from "../DashboardPages/Pages/ManageAdvice/ManageAdvice";
import UserPaymentHistiry from "../DashboardPages/Pages/UserPaymentHistiry/UserPaymentHistiry";
import AdminRoute from "./AdminRoute/AdminRoute";
import ManageMedicine from "../DashboardPages/Pages/ManageMedicine/ManageMedicine";
import PaymentsHistory from "../DashboardPages/Pages/PaymentsHistory/PaymentsHistory";
import ManageAdd from "../DashboardPages/Pages/ManageAdd/ManageAdd";
import DashboardHome from "../DashboardPages/Pages/DashboardHome/DashboardHome";
import ReportSell from "../DashboardPages/Pages/ReportSell/ReportSell";
import PrivetRoutes from "./PrivetRoutes/PrivetRoutes";
import SellerRoutes from "./SellerRoutes/SellerRoutes";
import ErrorPage from "../ErrorPage/ErrorPage";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/categories/:categoriesName",
        element: <CategoryDetails />,
      },
      {
        path: "/carts",
        element: <PrivetRoutes><ManageCart></ManageCart></PrivetRoutes>,
      },
      {
        path: "/checkout",
        element: <PrivetRoutes><CheckoutPage></CheckoutPage></PrivetRoutes>,
      },
      {
        path: "/invoice",
        element: <PrivetRoutes><InvoicePage></InvoicePage></PrivetRoutes>,
      },
      {
        path: "/update-profile",
        element: <PrivetRoutes><UpdateProfile></UpdateProfile></PrivetRoutes>
      }
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "home",
        element: <PrivetRoutes><DashboardHome></DashboardHome></PrivetRoutes>
      },
      // admin route
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            {" "}
            <PrivetRoutes>
            <ManageUser></ManageUser>
            </PrivetRoutes>
          </AdminRoute>
        ),
      },
      {
        path: "manage-category",
        element: (
          <AdminRoute>
            <PrivetRoutes><ManageCategory></ManageCategory></PrivetRoutes>
          </AdminRoute>
        ),
      },
      {
        path: "manage-payments",
        element: (
          <AdminRoute>
            <PrivetRoutes><ManagePayments></ManagePayments></PrivetRoutes>
          </AdminRoute>
        ),
      },
      {
        path: "manage-advice",
        element: (
          <AdminRoute>
            <PrivetRoutes><ManageAdvice></ManageAdvice></PrivetRoutes>
          </AdminRoute>
        ),
      },
      {
        path: 'report-sale',
        element: <AdminRoute>
          <PrivetRoutes><ReportSell></ReportSell></PrivetRoutes>
        </AdminRoute>
      },
      // user route
      {
        path: "payment-history",
        element: <PrivetRoutes><UserPaymentHistiry></UserPaymentHistiry></PrivetRoutes>,
      },
      // seller route
      {
        path: "manage-medicine",
        element: <SellerRoutes><PrivetRoutes><ManageMedicine></ManageMedicine></PrivetRoutes></SellerRoutes>,
      },
      {
        path: "payments-history",
        element: <SellerRoutes><PrivetRoutes><PaymentsHistory></PaymentsHistory></PrivetRoutes></SellerRoutes>,
      },
      {
        path: "manage-add",
        element: <SellerRoutes><PrivetRoutes><ManageAdd></ManageAdd></PrivetRoutes></SellerRoutes>,
      }
    ],
  },
]);
