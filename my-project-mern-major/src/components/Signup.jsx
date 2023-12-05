import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Store/Slices/UserSlice";
import Oauth from "./Oauth";

import { useAlert } from "react-alert";
const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [formvalue, setFormValue] = useState({});

  const isDisabled = () => {
    return disabled;
  };
  const handleChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleFormValue = (e) => {
    setFormValue({
      ...formvalue,
      [e.target.id]: e.target.value,
    });
  };
  const userForBackend = {
    name: "",
    email: "",
    avatar:
      "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg",
    role: "",
    password: "",
  };

  const signupUser = async (e) => {
    e.preventDefault();
    // console.log(formvalue);
    if (formvalue["password"] != formvalue["confirm-password"]) {
      alert.show("Password and Confirm Password should be same");
    } else {
      userForBackend.name = formvalue["username"];
      userForBackend.email = formvalue["email"];
      userForBackend.password = formvalue["password"];
      userForBackend.role = "";
      // console.log(userForBackend);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userForBackend),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        dispatch(createUser(data));
        setFormValue({});
        navigate("/");
        alert.success("Signup Successfull");
      } else {
        alert.error(data.error);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center bg-slate-100 h-full " >
        <section
          class=" dark:bg-gray-900 rounded-md "
          style={{ marginTop: "100px", width: "55vw" }}
        >
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-2 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form class="space-y-2 md:space-y-6" onSubmit={signupUser}>
                  <div>
                    <label
                      for="username"
                      class="block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                       focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username"
                      required=""
                      onChange={handleFormValue}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                       focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@gmail.com"
                      required=""
                      onChange={handleFormValue}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900
                       sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                         dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                          dark:focus:border-blue-500"
                      required=""
                      onChange={handleFormValue}
                    />
                  </div>
                  <div>
                    <label
                      for="confirm-password"
                      class="block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300
                       text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                       focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                         dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={handleFormValue}
                    />
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700
                          dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="terms"
                        class="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="w-full text-black bg-slate-600 
                  hover:bg-primary-700 focus:ring-4 focus:outline-none 
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 
                  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled={isDisabled()}
                  >
                    Submit
                  </button>
                </form>

                <Oauth />
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
