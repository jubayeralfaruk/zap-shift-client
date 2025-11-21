import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Services from "../pages/Services/Services";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/About";
import SendParcel from "../pages/SendParcel/SendParcel";
import BeRider from "../pages/BeRider/BeRider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayouts,
    children: [
        {
            index: true,
            Component:Home
        },
        {
          path: "services",
          element: <Services></Services>
        },
        {
          path: 'coverage',
          element: <Coverage></Coverage>
        },
        {
          path: 'about',
          element: <About></About>
        },
        {
          path: 'send-parcel',
          element: <SendParcel></SendParcel>,
          loader: () => { return fetch('/warehouses.json')}   
        },
        {
          path: 'be-rider',
          element: <BeRider></BeRider>,      
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children:[
      {
        path:"login",
        Component:Login
      },
      {
        path: "register",
        Component: Register
      }
    ]
  }
]);