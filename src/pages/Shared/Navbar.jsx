import React from "react";
import Logo from "../../Components/Logo";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Navbar = () => {
  const {user,logOut} = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut Successful..")
      })
      .catch(err => console.log(err))
  }
  const link = {
    
  }
  return (
    <div className="navbar rounded-2xl bg-base-100 shadow-sm mb-9">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <span className="text-xl"><Logo></Logo></span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/coverage">Services</Link>
          </li>
          <li>
            <Link to="/about">Services</Link>
          </li>
          <li>
            <Link to="/send-parcel">Services</Link>
          </li>
          <li>
            <Link to="/be-rider">Services</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? <Link onClick={handleLogOut} className="btn">LogOut</Link> : <Link to={'/login'} className="btn">Sing In</Link>
        }
      </div>
    </div>
  );
};

export default Navbar;
