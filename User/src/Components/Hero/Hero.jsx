/* eslint-disable react/no-unescaped-entities */
// import "./Hero.css";
import hero from "../../assets/webdev.png";
// import { Link } from "react-router-dom";
// import { HiLightBulb } from "react-icons/hi";
import { useAuth } from "../../Context/AuthContext";

const Hero = () => {

  const {user}=useAuth()

  return (
    <>
      <div className="hero-section  ">
        <div className="hero-img ">
          <img src={hero} alt="" />
        </div>
        <div className="hero-content ">
          <h1 className="font-bold text-5xl mb-10 text-purple-700 ">
            Hello! <span>{user.firstName}</span>
          </h1>
          <p className="text-white  text-2xl p-2 text-justify">
            User Management System includes a admin and user,the admin is able
            to control all the CRUD operations of the backend that will only be
            shown to admin when he logs in.While the user can also register
            itself but it cannot see the backend data.If the admin logins in he
            will be able to see all the users who have logged in.while the user
            can only send message to the admin.
          </p>
        </div>
        {/* <div className="hero-img">
          <img src={hero} alt=""/>
        </div>
        <div className="hero-content">
          <h1 className="font-bold text-4xl mb-10 text-purple-700">
            Hi,<span className="text-4xl text-white">{user.firstName}</span> to User management System
          </h1>
          <p className="text-white">
            User Management System includes a admin and user,the admin is able
            to control all the CRUD operations of the backend that will only be
            shown to admin when he logs in.While the user can also register
            itself but it cannot see the backend data.If the admin logins in he
            will be able to see all the users who have logged in.while the user
            can only send message to the admin.
          </p>
          <div className="know-more relative">
            <Link to="/about">
              <div className="icon flex items-center">
                <HiLightBulb color="white" size={25} className="bg-purple-700 absolute left-7"/>
                <button className="text-white know bg-purple-700 text-center">
                  Know More
                </button>
              </div>
            </Link>
          </div>
        </div> */}

      </div>
    </>
  );
};

export default Hero;
