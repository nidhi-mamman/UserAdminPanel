import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Logout from "./Pages/Logout";
import AdminContacts from "./Pages/AdminContacts";
import AdminUsers from "./Pages/AdminUsers";
import AdminDashboard from "./Pages/AdminDashboard";
import Update from "./Pages/Update";

function App() {
  const location = useLocation();

  // Determine if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path='/admin/users/:id/edit' element={<Update />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />

      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
