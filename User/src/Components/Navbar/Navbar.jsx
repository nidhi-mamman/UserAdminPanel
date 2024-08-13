import user from "../../assets/User-removebg-preview.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedin } = useAuth();

  return (
    <>
      <div className="top-nav bg-black m-4 shadow-md shadow-white">
        <div className="nav-bar p-2 ">
          <ul className="flex justify-around items-center text-white font-bold">
            <Link to="/">
              <li>
                <img
                  src={user}
                  alt=""
                  style={{ width: "5rem", height: "5rem" }}
                />
              </li>
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
