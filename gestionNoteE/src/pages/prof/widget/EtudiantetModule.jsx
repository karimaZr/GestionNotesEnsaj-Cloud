import { useEffect, useState } from "react";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./widget.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const EtudiantetModule = ({  }) => {
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

  useEffect(() => {
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
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div  style={{ boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)", padding: "10px", margin: "20px", display: "flex" }}>
          <h1 style={{ color: "lightgray", fontSize: "20px" }}>Professeur Cour</h1>
        </div>
      </div>
    </div>
  )
}

export default EtudiantetModule;
