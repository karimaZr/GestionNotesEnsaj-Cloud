import "./sidebar.scss";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

const Sidebar = () => {
  const { dispatch: authDispatch } = useContext(AuthContext); // Use 'authDispatch' here
  const { dispatch: darkModeDispatch } = useContext(DarkModeContext); // Use 'darkModeDispatch' here
  const navigate = useNavigate();
  const { currentUser, userId } = useContext(AuthContext); // Utilisez userId ici

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
          <li>
            <Link to="/admin1" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/profs" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Teachers</span>
            </li>
          </Link>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <SchoolOutlinedIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <Link to="/fields" style={{ textDecoration: "none" }}>
            <li>
              <CategoryOutlinedIcon className="icon" />
              <span>Fields</span>
            </li>
          </Link>
          <Link to="/notes" style={{ textDecoration: "none" }}>
            <li>
              <AssessmentOutlinedIcon className="icon" />
              <span>Marks</span>
            </li>
          </Link>
          <Link to="/template" style={{ textDecoration: "none" }}>
            <li>
              <DescriptionOutlinedIcon className="icon" />
              <span>Template</span>
            </li>
          </Link>
          <Link to="/module" style={{ textDecoration: "none" }}>
            <li>
              <DashboardOutlinedIcon className="icon" />
              <span>Module</span>
            </li>
          </Link>
          

          <Link to="/element" style={{ textDecoration: "none" }}>
            <li>
              <BookOutlinedIcon className="icon" />
              <span>Element</span>
            </li>
          </Link>


          <p className="title">USER</p>
          <Link to={`/profile1/${userId}`} style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li></Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: "DARK" })}
        ></div>
      </div>
    </div >
  );
};

export default Sidebar;
