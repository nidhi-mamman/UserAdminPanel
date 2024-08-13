import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
  return (
    <>
      <Navigate to="/signin"/>
    </>
  );
};

export default Logout;
