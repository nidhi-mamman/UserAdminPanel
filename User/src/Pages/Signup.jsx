import '../Components/CSS/Style.css';
import { useNavigate } from "react-router-dom";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";
import { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import {  toast } from 'react-toastify';

const Signup = () => {
  
  const [passwordVisible, setpasswordvisible] = useState(false);
  const [cpasswordVisible, setcpasswordvisible] = useState(false);
  const navigate = useNavigate();
  const {storeTokenInLS,BASE_URL}=useAuth()
  const formRef = useRef(null);

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/check-email`,
        {email}
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false; // Assume email doesn't exist if there's an error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let form = new FormData(formRef.current);

    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    // console.log(formData);

    const { firstName, lastName, email, password, cpassword } = formData;

    //Email validation regex
    const emailPattern = /^[a-zA-Z0-9._]+@(gmail\.com|yahoo\.com)$/;

    // Password validation regex
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!firstName || !lastName || !email || !password || !cpassword) {
      return toast("Please enter all the fields"); // Return to prevent further execution
    }

    if (!emailPattern.test(email)) {
      toast("Please enter a valid email address"); // Return to prevent further execution
      return;
    }

    if (!passwordPattern.test(password)) {
      toast(
        "Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character"
      );
      return;
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return toast("Email already exists.Try using another account");
    }

    if (password !== cpassword) {
      toast("Password does not match"); // Return to prevent further execution
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/post`,
        formData
      );
      console.log(response);
      const res_data = await response.data;
      storeTokenInLS(res_data.token)
      if (response.status === 201) {
        toast("Signed up successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-purple-700">SignUp</h1>
      <div className="signup">
        <div
          id="form-area"
          className="shadow-md shadow-purple-700 border rounded-3xl"
        >
          <form id="form" ref={formRef}>
            <div className="form-part m-2 bg-black">
              <input
                className="text-white border-b-2 border-white outline-none"
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-part m-2">
              <input
                className="text-white border-b-2 border-white  outline-none"
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="form-part m-2">
              <input
                className="text-white   border-b-2 border-white outline-none"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-part-pass m-2 flex">
              <input
                className="text-white  border-b-2 border-white outline-none"
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              {passwordVisible ? (
                <IoEyeSharp
                  color="white"
                  size="1.5rem"
                  style={{ marginLeft: "-2rem", cursor: "pointer" }}
                  onClick={() => setpasswordvisible(!passwordVisible)}
                />
              ) : (
                <IoEyeOffSharp
                  color="white"
                  size="1.5rem"
                  style={{ marginLeft: "-2rem", cursor: "pointer" }}
                  onClick={() => setpasswordvisible(!passwordVisible)}
                />
              )}
            </div>
            <div className="form-part-pass flex m-2">
              <input
                className="text-white   border-b-2 border-white outline-none"
                type={cpasswordVisible ? "text" : "password"}
                name="cpassword"
                placeholder="Confirm Password"
                required
              />
              {cpasswordVisible ? (
                <IoEyeSharp
                  color="white"
                  size="1.5rem"
                  style={{ marginLeft: "-2rem", cursor: "pointer" }}
                  onClick={() => setcpasswordvisible(!cpasswordVisible)}
                />
              ) : (
                <IoEyeOffSharp
                  color="white"
                  size="1.5rem"
                  style={{ marginLeft: "-2rem", cursor: "pointer" }}
                  onClick={() => setcpasswordvisible(!cpasswordVisible)}
                />
              )}
            </div>
            <button
              className="know bg-purple-700 text-white"
              onClick={handleSubmit}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
