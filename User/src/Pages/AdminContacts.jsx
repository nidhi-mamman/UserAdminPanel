import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import "../Components/CSS/Style.css";
import Sidebar from "../Components/Admin/Sidebar/Sidebar";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const { authorizationToken,BASE_URL } = useAuth();

  const [contacts, setContacts] = useState([]);

  const [sortCriteria, setSortCriteria] = useState(null);

  const getAllUsersContacts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/contacts`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = response.data;
      console.log(`contacts ${data}`);
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortContacts = (criteria) => {
    const sortedContacts = [...contacts].sort((a, b) => {
      if (criteria === "firstName") {
        return a.firstName.localeCompare(b.firstName);
      } else if (criteria === "email") {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });
    setContacts(sortedContacts);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value); // Update sortCriteria state
  };

  const deleteContactById = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/contact/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
     if(response.status===200){
      toast.success("Contact deleted successfully")
      getAllUsersContacts()
     }
     else{
      toast.error("Not Deleted")
     }
    } catch (error) {
      toast.error(error);
    }
  };

  // Update sorting whenever sortCriteria changes
  useEffect(() => {
    if (sortCriteria) {
      sortContacts(sortCriteria);
    }
  }, [sortCriteria]);

  useEffect(() => {
    getAllUsersContacts();
  }, []);

  return (
    <>
      <div className="flex gap-11">
        <div className="sidebar">
          <Sidebar />
        </div>
        <section className="tableWrapper ">
          <div className="heading">
            <h1 className="text-purple-700 text-5xl font-bold  my-8">
              Admin Contacts Data
            </h1>
            <div className="sortby">
              <select
                className="sorter "
                name="sort"
                value={sortCriteria}
                onChange={handleSortChange}
              >
                <option value="">Sort by</option>
                <option value="firstName">Name</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
          <div className="table-area">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((curContact, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{curContact.firstName}</td>
                      <td>{curContact.email}</td>
                      <td>
                        <div className="message ">{curContact.message}</div>
                      </td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => {
                            deleteContactById(curContact._id);
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
        </section>
      </div>
    </>
  );
};

export default AdminContacts;
