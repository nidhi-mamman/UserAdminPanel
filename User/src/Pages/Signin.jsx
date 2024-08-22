import { Link, useNavigate } from "react-router-dom";
import '../Components/CSS/Style.css';
import axios from "axios";
import { useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { toast } from 'react-toastify';

const Signin = () => {


  const [isVisible, setisVisible] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS,BASE_URL,user} = useAuth()
  const formRef = useRef();



  const handleLogin = async (e) => {
    e.preventDefault();

    let form = new FormData(formRef.current);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    console.log(formData)
    
    try {
      const response = await axios.post(`${BASE_URL}/api/signin`, formData);
      const res_data = response.data;

      storeTokenInLS(res_data.token);

      // Check for admin status
      if (response.status === 200) {
        toast("Signed in successfully");

        // Navigate based on user role
        if (res_data.isAdmin) {
          navigate("/admin/dashboard"); // Navigate to admin dashboard
        } else {
          alert(`Welcome to User Management System ${user.firstName}`)
          navigate("/");
           // Navigate to the home page or user-specific page
        }
      } else {
        toast("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during sign in:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        if (error.response.status === 401) {
          toast("Incorrect email or password. Please try again.");
        } else {
          toast("An error occurred. Please try again later.");
        }
      } else {
        toast("Network error. Please check your connection.");
      }
    }
  };


  return (
    <>
      <div className="signin-wrapper ">
        <div className="signin-box">
          <h1 className="text-white font-bold text-5xl">Sign In</h1>
          <form ref={formRef} onSubmit={handleLogin}>
            {/* email section */}
            <div className="input-group flex m-5 border-b-2 border-white right-11 ">
              <i className="bx bxs-envelope bx-sm m-2 p-1 input-icon"></i>
              <input
                type="email"
                name="email"
                className="text-white outline-none"
                required
              />
            </div>
            {/* password section */}
            <div className="input-group flex m-5 right-11 input-icon relative border-b-2 border-white ">
              <i className="bx bxs-key bx-sm m-2 p-1"></i>
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                className="text-white outline-none"
                required
              />
              {isVisible ? (
                <i
                  className="bx bxs-show bx-sm m-2 p-1 input-icon absolute right-2 cursor-pointer"
                  onClick={() => setisVisible(!isVisible)}
                ></i>
              ) : (
                <i
                  className="bx bxs-hide bx-sm m-2 p-1 input-icon absolute right-2 cursor-pointer"
                  onClick={() => setisVisible(!isVisible)}
                ></i>
              )}
            </div>
            <button
              className="text-white know bg-purple-700 text-center"
            >
              Sign In
            </button>
          </form>
          <p className="text-white text-md">
            Not a user ?{" "}
            <Link
              to="/signup"
              className="text-purple-700  hover:text-white hover:underline"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </>
    // email,password
  );
};

export default Signin;
