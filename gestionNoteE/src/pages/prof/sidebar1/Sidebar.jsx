import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";
import 'primeicons/primeicons.css';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { AuthContext } from "../../../context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

import SchoolIcon from '@mui/icons-material/School';
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch } = useContext(AuthContext); // Use 'authDispatch' here
  const navigate = useNavigate();
  const { currentUser, userId } = useContext(AuthContext); // Utilisez userId ici
  console.log("id",userId)
  const handleLogout = () => {
    // Dispatch a logout action from AuthContext
    authDispatch({ type: "LOGOUT" });
    navigate('/'); // Navigate to the login page after logout
  };
  return (
    <div className="sidebar">
     <div className="top">
        <img src="https://cdn-icons-png.flaticon.com/512/8289/8289722.png" alt="Logo" className="logoImg" />
        <span className="logo">Note</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={`/profile/${userId}`} style={{ textDecoration: "none" }}>

          <li>
            <PersonIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <Link to={`/dash/${userId}`} style={{ textDecoration: "none" }}>

          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to={`/courses/${userId}`} style={{ textDecoration: "none" }}>
  <li>
    <SchoolIcon className="icon " />
    <span>Courses</span>
  </li>
</Link>

          <Link to={`/notif/${userId}`} style={{ textDecoration: "none" }}>
          <li>
          <AddHomeWorkIcon className="icon " />
            <span>Devoirs</span>
          </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
        <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
