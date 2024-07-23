import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModuleDropdown.scss"; // Importez votre fichier de style SCSS
import { useParams } from "react-router-dom";

const ModuleDropdown = ({ onSelect }) => {
  const [elementModules, setElementModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const { userId } = useParams();
  const [profCIN, setProfCIN] = useState(null);
console.log("id",userId)
useEffect(() => {
  // Effectuez une requête pour récupérer les informations du professeur
  const fetchProfInfo = async () => {
      try {
          const response = await fetch(`http://localhost:3000/prof/${userId}`);
          if (!response.ok) {
              throw new Error('Erreur lors de la récupération des informations du professeur');
          }
          const profData = await response.json();
          setProfCIN(profData.CIN); // Extraire le CIN du professeur de la réponse
      } catch (error) {
          console.error('Erreur lors de la récupération des informations du professeur:', error);
      }
  };

  fetchProfInfo();
}, [userId]);

  useEffect(() => {
    if (profCIN) {
      // Effectuer une requête HTTP pour récupérer les éléments de module avec le CIN du professeur
      axios
        .get(`http://localhost:3000/elementModule/elementModules/prof/${profCIN}/2023-2024`)
        .then((response) => {
          setElementModules(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des éléments de module :", error);
        });
    }
  }, [profCIN]);

  const handleModuleSelect = (event) => {
    const moduleId = event.target.value;
    const selectedModule = elementModules.find((module) => module.id === moduleId);
    setSelectedModule(selectedModule);
    onSelect(selectedModule.code, moduleId);
  };

  return (
    <div className="widget dropdown">
      <div className="select-container">
        <select onChange={handleModuleSelect}>
          <option value="">Sélectionner un élément de module</option>
          {elementModules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.nom}
            </option>
          ))}
        </select>
        <div className="select-arrow">&#9660;</div>
      </div>
    </div>
  );
};

export default ModuleDropdown;
