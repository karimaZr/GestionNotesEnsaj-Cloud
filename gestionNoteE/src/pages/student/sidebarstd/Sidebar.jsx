import "./sidebar.scss";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext ,useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Sidebar = ({ etudiantId }) => {
  const { dispatch: authDispatch } = useContext(AuthContext); // Use 'authDispatch' here
  const { dispatch: darkModeDispatch } = useContext(DarkModeContext); // Use 'darkModeDispatch' here
  const navigate = useNavigate();
  const { currentUser, userId } = useContext(AuthContext); // Utilisez userId ici

  const handleLogout = () => {
    // Dispatch a logout action from AuthContext
    authDispatch({ type: "LOGOUT" });
    navigate('/'); // Navigate to the login page after logout
  };
  
    const [etudiant, setEtudiant] = useState({
      nom: '',
      prenom: '',
      email: '',
      photo: ''
    });
  
    useEffect(() => {
      const fetchEtudiantData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/etudiant/${userId}`);
          setEtudiant(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données de l\'étudiant :', error);
        }
      };
  
      fetchEtudiantData();
    }, [etudiantId]);
  
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
          
          <p className="title">LISTS</p>
          <Link to="/student" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to={`/profile2/${userId}`} style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <Link to={`/notes/${userId}`} style={{ textDecoration: "none" }}>

          <li>
            <InsertChartIcon className="icon" />
            <span>Notes</span>
          </li>
          </Link>
          <Link to="/devoir" style={{ textDecoration: "none" }}>
            <li>
              <SchoolOutlinedIcon className="icon" />
              <span>Devoir</span>
            </li>
          </Link>
          <p className="title">USER</p>
          
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
    </div>
  );
};

export default Sidebar;
