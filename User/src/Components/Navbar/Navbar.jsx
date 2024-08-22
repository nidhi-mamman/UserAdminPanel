import user from "../../assets/User-removebg-preview.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedin } = useAuth();
   const[sidebarIsOpen,setSidebarIsOpen]=useState(false)

  return (
    <>
      <div className="top-nav bg-black shadow-md shadow-white">
        <div className="nav-bar ">
          <ul className={`${sidebarIsOpen ? "sidebar open" : "hide-sidebar"}`}>
            <Link>
              <li><RxCross1 color="white" onClick={()=>{setSidebarIsOpen(!sidebarIsOpen)}}/></li>
            </Link>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/services">
              <li>Services</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
            {isLoggedin ? (
              <Link to="/logout">
                <li>
                  <button className="login">Logout</button>
                </li>
              </Link>
            ) : (
              <Link to="/signin">
                <li>
                  <button className="login">Login/Signup</button>
                </li>
              </Link>
            )}
          </ul>
          <ul>
            <li><Link to="/">
              <img src={user} alt="" style={{ width: "5rem", height: "5rem" }} />
            </Link>
            </li>
            <Link to="/">
              <li className="hideOnMobile">Home</li>
            </Link>
            <Link to="/about">
              <li className="hideOnMobile">About</li>
            </Link>
            <Link to="/services">
              <li className="hideOnMobile">Services</li>
            </Link>
            <Link to="/contact">
              <li className="hideOnMobile">Contact</li>
            </Link>
            {isLoggedin ? (
              <Link to="/logout">
                <li className="hideOnMobile">
                  <button className="login">Logout</button>
                </li>
              </Link>
            ) : (
              <Link to="/signin">
                <li className="hideOnMobile">
                  <button className="login">Login/Signup</button>
                </li>
              </Link>
            )}
            <IoMdMenu color="white" size={30} className='hideOnBigScreens' onClick={()=>{setSidebarIsOpen(!sidebarIsOpen)}} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
