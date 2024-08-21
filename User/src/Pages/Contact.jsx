import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import contact from "../assets/contact.jpg";
import { useAuth } from "../Context/AuthContext";
import "../Components/CSS/Style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const Contact = () => {
  const { user, BASE_URL } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : "",
    email: user ? user.email : "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        email: user.email,
        message: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to send a message");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/form/contact`,
        formData
      );
      setFormData({
        message: "",
      });
      toast(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-5xl mt-10 font-bold text-purple-700 hover:text-white">
        Contact Us
      </h1>
      <div className="form-section bg-black">
        <img src={contact} alt="" />
        <form className="form-group">
          <div className="form-control bg-black flex mt-16">
            <FaUser
              color="white"
              size="1.5rem"
              style={{
                marginTop: "0.3rem",
                marginRight: "0.3rem",
                padding: "0.2rem",
                borderRadius: "50%",
              }}
            />
            <input
              className="text-white outline-none border-none"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Your Name"
              readOnly
            />
          </div>
          <div className="form-control bg-black flex">
            <MdEmail
              color="white"
              size="1.5rem"
              style={{
                marginTop: "0.3rem",
                marginRight: "0.3rem",
                padding: "0.2rem",
                borderRadius: "50%",
              }}
            />
            <input
              className="text-white outline-none border-none"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
              readOnly
            />
          </div>

          <textarea
            className="border-1 border-white outline-none p-2 rounded-md mt-10 text-white"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            rows={8}
            cols={45}
            required
          ></textarea>

          <button
            className="know text-white bg-purple-700 font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
