import React from 'react';
import icon from "../../assets/service.png"

const OurServices = () => {
    return (
        <div className='bg-secondary p-[100px]'>
            <h2 className="text-[40px] font-extrabold text-center text-white">
                Our Services
            </h2>
            <p className="text-[#DADADA] text-center text-[min(3vw,16px)] max-w-[718px]">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white rounded-xl p-8">
                    <img className='mx-auto p-3 bg-gray-100 rounded-full' src={icon} alt="" />
                    <h5 className="text-secondary text-2xl font-bold text-center max-w-[255px]">
                        title
                    </h5>
                    <p className="text-accent text-center"></p>
                </div>
            </div>
        </div>
    );
};

export default OurServices;