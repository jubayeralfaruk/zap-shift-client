import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth();
  const  axiosSecure = useAxiosSecure()
  //   const [showWeight, setShowWeight] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const locationData = useLoaderData();
  //   console.log(locationData);
  const regionDuplicate = locationData.map((c) => c.region);
  const region = [...new Set(regionDuplicate)];
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const parcelTypee = watch("parcelType");
  const districtByRegion = (region) => {
    const regionDistricts = locationData.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    // console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Agree With the cost?",
      text: `You will be charged ${cost} tk.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        const allData = {
          ...data,
          deliveryCost: cost,
          senderEmail: user.email,
        };
        axiosSecure.post("/parcels", allData)
        .then(data => {
          console.log("after parcel send", data);
          Swal.fire({
          title: "Parcel!",
          text: "Your parcel sended & status padding.",
          icon: "success",
        });
          
        })
      }
    });

    console.log(cost);
  };

  return (
    <div className="px-[100px] py-[80px] bg-white rounded-2xl">
      <div className="">
        <h1 className="text-[min(5vw,54px)] font-extrabold text-secondary ">
          Send A Parcel
        </h1>
        <h4
          className="text-[min(5vw,28px)] font-extrabold
                text-secondary border-b border-gray-200 pb-7 mb-7 "
        >
          Enter your parcel details
        </h4>
      </div>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* parcel type*/}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200 pb-7 mb-7 gap-7">
          <fieldset className="fieldset">
            <label name="name" className="label font-medium text-[#0F172A]">
              Parcel Name
            </label>
            <input
              type="text"
              name="name"
              {...register("parcelName", { required: true })}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <div className="">
            {parcelTypee === "non-document" && (
              <fieldset className="fieldset">
                <label className="label font-medium text-[#0F172A]">
                  Parcel Weight (KG)
                </label>
                <input
                  type="number"
                  {...register("parcelWeight", { required: true })}
                  className="input w-full"
                  placeholder="Parcel Weight (KG)"
                />
              </fieldset>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Sender */}
          <div className="">
            <h1 className="text-[min(3vw,18px)] font-extrabold text-secondary ">
              Sender Details
            </h1>
            {/* sender name */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Sender Name
              </label>
              <input
                type="text"
                {...register("senderName", { required: true })}
                className="input w-full"
                placeholder="Sender Name"
              />
            </fieldset>
            {/* sender phone no */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Sender Phone No.
              </label>
              <input
                type="text"
                {...register("senderPhone", { required: true })}
                className="input w-full"
                placeholder="Sender Phone No."
              />
            </fieldset>
            {/* senderYour Region */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Your Region
              </label>
              <select
                defaultValue="Select Region"
                {...register("senderRegion", { required: true })}
                className="select w-full"
              >
                <option disabled={true}>Select Region</option>
                {region.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* senderYour District */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Your District
              </label>
              <select
                {...register("senderDistrict", { required: true })}
                defaultValue="Select District"
                className="select w-full"
              >
                <option disabled={true}>Select District</option>
                {districtByRegion(senderRegion).map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
            </fieldset>
            {/* sender address */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Sender Address
              </label>
              <input
                type="text"
                {...register("senderAddress", { required: true })}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset>
            {/* pickup instruction */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Pickup Instruction
              </label>
              <textarea
                {...register("senderPickupInstruction")}
                className="textarea w-full"
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </div>
          {/* receiver*/}
          <div className="">
            <h1 className="text-[min(3vw,18px)] font-extrabold text-secondary ">
              Receiver Details
            </h1>
            {/* Receiver name */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Receiver Name
              </label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                className="input w-full"
                placeholder="Receiver Name"
              />
            </fieldset>
            {/* Receiver phone no */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Receiver Phone No.
              </label>
              <input
                type="text"
                {...register("receiverPhone", { required: true })}
                className="input w-full"
                placeholder="Receiver Phone No."
              />
            </fieldset>
            {/* ReceiverYour Region */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Receiver Region
              </label>
              <select
                defaultValue="Select Region"
                {...register("receiverRegion", { required: true })}
                className="select w-full"
              >
                <option disabled={true}>Select Region</option>
                {region.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </fieldset>
            {/* ReceiverYour District */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Receiver District
              </label>
              <select
                {...register("receiverDistrict", { required: true })}
                defaultValue="Select District"
                className="select w-full"
              >
                <option disabled={true}>Select District</option>
                {districtByRegion(receiverRegion).map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
            </fieldset>
            {/* Receiver address */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Receiver Address
              </label>
              <input
                type="text"
                {...register("receiverAddress", { required: true })}
                className="input w-full"
                placeholder="Receiver Address"
              />
            </fieldset>
            {/* pickup instruction */}
            <fieldset className="fieldset">
              <label className="label font-medium text-[#0F172A]">
                Pickup Instruction
              </label>
              <textarea
                {...register("receiverPickupInstruction")}
                className="textarea w-full"
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </div>
        </div>
        <p className="my-12">* PickUp Time 4pm-7pm Approx.</p>
        <button type="submit" className="btn bg-primary btn-wide font-semibold">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
