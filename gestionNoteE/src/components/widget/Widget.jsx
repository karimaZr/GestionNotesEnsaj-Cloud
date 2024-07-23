import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import axios from 'axios';
const Widget = ({ title, link, icon, counter, percentage }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter1">{counter}</span>
        <a href={link} className="link">Voir les détails</a>
      </div>
      <div className="right">
        <div className={`percentage ${percentage < 0 ? "negative" : "positive"}`}>
          {percentage < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {percentage !== null ? `${percentage.toFixed(2)}%` : ""}
        </div>
        {icon}
      </div>
    </div>
  );
};

const WidgetContainer = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:3000/elementmodule');
        setModules(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des modules de l\'étudiant:', error);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="widget-container">
      {modules.map((module) => (
        <Widget
          key={module.id}
          title={module.nom}
          link={`http://localhost:3001/notes`}
          counter={module.abreviation}
          icon={<PersonOutlinedIcon className="icon" style={{ backgroundColor: "rgba(0, 0, 255, 0.2)", color: "blue" }} />}
          percentage={null}
        />
      ))}
    </div>
  );
};

export default WidgetContainer;
