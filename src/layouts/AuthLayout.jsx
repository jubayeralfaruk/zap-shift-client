import React from 'react';
import Logo from '../Components/Logo';
import { Outlet } from 'react-router';
import authImage from "../assets/authImage.png"

const AuthLayout = () => {
    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="min-h-screen">
                <Logo></Logo>
                <div className="">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="h-full flex items-center bg-[#FAFDF0]">
                <img src={authImage} alt="" />
            </div>
        </div>
    );
};

export default AuthLayout;