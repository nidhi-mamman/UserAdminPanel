/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const authprovider = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const[isLoading,setisLoading]=useState(true)
  const authorizationToken=`Bearer ${token}`
  const BASE_URL='https://useradminpanel.onrender.com'

  let isLoggedin = !!token;

  console.log("isLoggedin", isLoggedin);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken)
  };

  //TO GET LOGGED IN USER DATA

  const userAuthentication = async () => {
    try {
      setisLoading(true)
      const response = await axios.get(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("user data", data.userData);
        setUser(data.userData); 
        setisLoading(false)
      }
      else{
        console.log("Error fetching user data")
        setisLoading(false)
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  //TACKLING THE LOGOUT FUNCTIONALITY
  const LogoutUser = () => {
    setToken(null);
    setUser(null)
    return localStorage.removeItem("token");
  };
  return (
    <authprovider.Provider
      value={{ storeTokenInLS, LogoutUser, isLoggedin, user,authorizationToken,isLoading,BASE_URL}}
    >
      {props.children}
    </authprovider.Provider>
  );
};

export const useAuth = () => {
  const authValue = useContext(authprovider);
  if (!authValue) {
    throw new Error("userAuth used outside of the Provider");
  }
  return authValue;
};
