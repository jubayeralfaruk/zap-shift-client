import React from "react";
import icon from "../../assets/bookingIcon.png";

const HowItWorks = () => {
  const data = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="px-20">
      <h3 className="text-[32px] font-extrabold text-secondary mb-8">
        How it Works
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <>
            <div className="p-8 bg-white rounded-2xl space-y-2">
              <img
                src={icon}
                alt=""
              />
              <h5 className="text-[min(3vw,20px)] font-bold text-secondary">
                {item.title}
              </h5>
              <p className="text-accent text-[min(3vw,18px)]">
                {item.description}
              </p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
