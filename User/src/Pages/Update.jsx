import { useEffect, useState } from "react";
import Sidebar from "../Components/Admin/Sidebar/Sidebar";
import "../Components/CSS/Style.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const Update = () => {
  const [data, setData] = useState({
    firstName: " ",
    lastName: " ",
    email: " ",
  });

  const params = useParams();
  console.log(params);

  const { authorizationToken,BASE_URL } = useAuth();

  const getSingleUserById = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/user/${params.id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = response.data;
      console.log(`users single data,${data}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserById();
  }, []);

  const UpdatedUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/user/update/${params.id}`,
        data, 
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex gap-11">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="update-area ">
          <div className="text-center">
            <h1 className="text-purple-700 text-5xl font-bold ">
              Update User Data
            </h1>
          </div>
          <div className="update-form">
            <form onSubmit={UpdatedUser}>
              <div className="form-update">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-update">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-update">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <button className="know bg-purple-700 text-white" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
