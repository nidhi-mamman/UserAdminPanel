/* eslint-disable react/no-unescaped-entities */
import "./Hero.css";
import hero from "../../assets/webdev.png";
import { Link } from "react-router-dom";
import { HiLightBulb } from "react-icons/hi";
import { useAuth } from "../../Context/AuthContext";

const Hero = () => {

  const { user } = useAuth()

  return (
    <>
      <div className="hero-section  ">
        <div className="hero-img ">
          <img src={hero} alt="" />
        </div>
        <div className="hero-content">
          <h1>
            Hello! <span>{user.firstName}</span>
          </h1>
          <p >
            User Management System includes a admin and user,the admin is able
            to control all the CRUD operations of the backend that will only be
            shown to admin when he logs in.While the user can also register
            itself but it cannot see the backend data.If the admin logins in he
            will be able to see all the users who have logged in.while the user
            can only send message to the admin.
            <div className="know-more">
              <Link to="/about">
                <div className="icon">
                  <HiLightBulb color="white" size={25} className="bulb" />
                  <button className="know">
                   More
                  </button>
                </div>
              </Link>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
