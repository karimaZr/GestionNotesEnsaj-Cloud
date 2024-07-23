import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Assurez-vous que le contexte est correctement importé

const Navbar = () => {
  const { currentUser } = useContext(AuthContext); // Obtenez les informations de l'utilisateur connecté à partir du contexte
  const { userId } = useContext(AuthContext); // Obtenez l'ID de l'utilisateur connecté à partir du contexte
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            {currentUser && currentUser.photo ? ( // Vérifiez si l'utilisateur et sa photo existent
              <img
                src={currentUser.photo} // Utilisez l'URL de la photo de l'utilisateur
                alt="Avatar"
                className="avatar"
              />
            ) : (
              <img
                src="placeholder.jpg" // Utilisez une image par défaut si l'utilisateur n'a pas de photo
                alt="Avatar"
                className="avatar"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
