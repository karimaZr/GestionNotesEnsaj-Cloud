import { useEffect, useState } from "react";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./widget.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const ProfCourses = ({  }) => {
  const [elementModules, setElementModules] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
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
    const fetchElementModules = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/elementModule/elementModules/prof/${profCIN}/2023-2024`);
        console.log("data",response)

        setElementModules(response.data);
        console.log("data",response.data)
      } catch (error) {
        console.error("Erreur lors de la récupération des éléments de module :", error);
      }
    };

      fetchElementModules();
    
  }, [profCIN]);

  useEffect(() => {
    let total = 0;
    const fetchTotalStudents = async () => {
      for (const elementModule of elementModules) {
        try {
            console.log("id",elementModule.id)
 
          const response = await axios.get(`http://localhost:3000/etudiant/elementmodule/${elementModule.id}`);

          total += response.data.length;
        } catch (error) {
          console.error("Erreur lors de la récupération du nombre d'étudiants pour l'élément de module :", error);
        }
      }
      setTotalStudents(total);
    };

    if (elementModules.length > 0) {
      fetchTotalStudents();
    }
  }, [elementModules]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">Total des étudiants enseignés</span>
        <span className="counter">{totalStudents}</span>
        <span className="link">Voir tous les étudiants</span>
      </div>
      <div className="right">
        <AccountCircleOutlinedIcon
          className="icon"
          style={{ color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)" }}
        />
      </div>
    </div>
  );
};

export default ProfCourses;
