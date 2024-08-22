import { Navigate } from "react-router-dom";
import Sidebar from "../Components/Admin/Sidebar/Sidebar";
import { useAuth } from "../Context/AuthContext";
import { MdContacts } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import '../Components/CSS/Style.css'
import axios from 'axios'

const AdminDashboard = () => {

  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const { user, isLoading, authorizationToken ,BASE_URL} = useAuth();

  //TO GET USER COUNT
  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/user-count`, {
        headers: {
          Authorization: authorizationToken
        }
      });
      console.log("count", response.data.count)
      setUserCount(response.data.count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  //TO GET CONTACT COUNT
  const fetchContactCount = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/contact-count`, {
        headers: {
          Authorization: authorizationToken
        }
      });
      console.log("count", response.data.count)
      setContactCount(response.data.count);
    } catch (error) {
      console.error('Error fetching contact count:', error);
    }
  };
  useEffect(() => {
    fetchUserCount();
    fetchContactCount()
  }, []);

  if (isLoading) {
    return <h1 className="text-white">Loading......</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <div className="admin-board">
            <h1 className="text-purple-700 font-bold text-5xl">Welcome Admin</h1>
          </div>
          <div className="admin-cards">
            <div className="user-count">
              <span className="bg-black text-white text-3xl">Total no. of Users</span>
              <FaUserCircle size={100} style={{ backgroundColor: "black", color: "white" }} />
              {userCount}</div>
            <div className="user-count">
              <span className="bg-black text-white text-2xl">Total no. of Contacts</span>
              <MdContacts size={100} style={{ backgroundColor: "black", color: "white" }} />
              {contactCount}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
