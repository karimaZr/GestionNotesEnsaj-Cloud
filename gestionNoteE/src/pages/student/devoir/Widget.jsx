import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DocumentIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Link } from "react-router-dom";

const Widget = ({ title, file, datedebut, dateFin, link }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="description">Du {new Date(datedebut).toLocaleDateString()} au {new Date(dateFin).toLocaleDateString()}</span>
        <Link to={link} className="link">Télécharger {file}</Link>
      </div>
      <div className="right">
        <DocumentIcon style={{ backgroundColor: "rgba(0, 0, 255, 0.2)", color: "blue" }} />
      </div>
    </div>
  );
};

export default Widget;
