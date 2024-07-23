import { useEffect, useState } from "react";
import axios from "axios";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import "./widget.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Widget = () => {
  const [moduleCount, setModuleCount] = useState(null);
  const { userId } = useParams();
  const [profCIN, setProfCIN] = useState(null);

  useEffect(() => {
    // Effectuez une requête pour récupérer les informations du professeur
    const fetchProfInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/prof/${userId}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations du professeur");
        }
        const profData = await response.json();
        setProfCIN(profData.CIN); // Extrayez le CIN du professeur de la réponse
      } catch (error) {
        console.error("Erreur lors de la récupération des informations du professeur:", error);
      }
    };

    fetchProfInfo(); // Appelez la fonction pour récupérer les informations du professeur
  }, [userId]);

  useEffect(() => {
    const fetchModuleCount = async () => {
      try {
        if (profCIN) {
          const response = await axios.get(
            `http://localhost:3000/elementModule/elementModules/prof/${profCIN}/2023-2024`
          );
          setModuleCount(response.data.length);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'éléments de module :", error);
      }
    };

    fetchModuleCount();
  }, [profCIN]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">Nombre d'éléments de module</span>
        <span className="counter">{moduleCount}</span>
        <Link to={`/courses/${userId}`} style={{ textDecoration: "none" }}>
          <span className="link">Voir tous les éléments</span>
        </Link>
      </div>
      <div className="right">
        <PersonOutlinedIcon
          className="icon"
          style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
        />
      </div>
    </div>
  );
};

export default Widget;
