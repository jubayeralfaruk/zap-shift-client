import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link
        to={"/"}
        className="flex items-end cursor-pointer ">
        <img
          src={logo}
          alt=""
        />
        <p className="font-extrabold text-3xl  -ms-3">ZapShift</p>
      </Link>
    </div>
  );
};

export default Logo;
