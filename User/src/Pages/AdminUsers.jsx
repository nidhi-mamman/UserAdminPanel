import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import "../Components/CSS/Style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./../Components/Admin/Sidebar/Sidebar";
const Users = () => {
  const [users, setUsers] = useState([]);

  const { authorizationToken,BASE_URL } = useAuth();

  //To ACCESS ALL THE USERS DATA
  const getAllUsersData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/users`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = response.data;
      console.log(`users${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //TO DELETE A USER
  const deleteUser = async (id) => {
    console.log("Attempting to delete user with ID:", id);
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/users/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = response.data;
      
      if(response.status===200){
        getAllUsersData()
      }
      console.log(`users after delete ${data}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <div className="flex gap-11">
        <div className="sidebar">
          <Sidebar />
        </div>
        <section className="admin-users-section ">
          <div className="container ">
            <h1 className=" text-5xl font-bold text-purple-700  mb-10">
              Admin Users Data
            </h1>
          </div>
          <div className="container admin-users ">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((curUser, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{curUser.firstName}</td>
                        <td>{curUser.lastName}</td>
                        <td>{curUser.email}</td>
                        <td>
                          <Link to={`/admin/users/${curUser._id}/edit`} className="bg-white"><button className="edit">Edit</button></Link>
                        </td>
                        <td>
                          <button
                            className="delete"
                            onClick={() => {
                              deleteUser(curUser._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Users;
