import Logo from "../../../assets/admn.jpg";
import { IoHome } from "react-icons/io5";
import { FaUsersLine } from "react-icons/fa6";
import { RiContactsBook3Fill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setisOpen] = useState(true);

  const handleSidebar = () => {
    setisOpen(!isOpen);
  };

  return (
    <>
      <header className={`header ${isOpen ? "" : "close"}`}>
        <div className="admin-logo">
          <img src={Logo} alt="Admin logo" width={80} height={80} />
          <div className={`arrow ${isOpen ? "" : "close"}`}>
            <IoIosArrowBack onClick={handleSidebar} />
          </div>
        </div>
        <div className="menu">
          <div className="menu-items">
            <ul>
              <Link to='/admin/dashboard'><li className="flex items-center font-semibold  gap-5  text-xl">
                <IoHome size={30} />
                Dashboard
              </li></Link>
              <Link to="/admin/users">
                <li className="flex items-center font-semibold  gap-5 text-xl">
                  <FaUsersLine size={30} />
                  Users
                </li>
              </Link>
              <Link to="/admin/contacts">
                <li className="flex items-center gap-5 font-semibold  text-xl">
                  <RiContactsBook3Fill size={30} />
                  Contacts
                </li>
              </Link>
              <Link to="/logout">
                <li className="flex items-center gap-5 font-semibold  text-xl">
                  <BiLogOutCircle size={30} />
                  Logout
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Sidebar;
