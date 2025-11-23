import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const {registerUser, userDataUpdate} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = (data) => {    
    const photo = data.photo[0]
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", photo);

        fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_imgBB_apiKey}`, {
          method: "POST",
          body: formData
        })
          .then(res => res.json())
          .then(imageData => {
            console.log("1",imageData.data.url);
            console.log(imageData.data);
            const newData = {
              displayName: data.name,
              photoURL: imageData.data.url
            }
            userDataUpdate(newData)
              .then(result => {
                console.log(result);
                toast.success("User Create Successful..!")
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.error(err))
      })
      .catch(err => toast.error(err.message))

  };
  return (
    <div className="w-9/12 lg:w-7/12 mx-auto">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Full Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}
          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="input w-full file-input"
            placeholder="Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required.</p>
          )}
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 character.</p>
          )}
          {
            errors.pattern?.type === "pattern" && (
              <p className="text-red-500">  Password must include uppercase, lowercase, and special character.</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
