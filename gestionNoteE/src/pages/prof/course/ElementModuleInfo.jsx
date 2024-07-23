import React, { useState, useEffect } from 'react';
import './element.scss'; // Importez votre fichier CSS pour les styles d'élément de module
import { CircularProgressbar } from "react-circular-progressbar";
import axios from "axios";

const ElementModuleInfo = ({ elementModule }) => {
  const { code, description, nom, pourcentage, moduleId } = elementModule;
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const fetchModuleName = async () => {
      try {
        // Accéder à l'ID du module à partir de l'objet Firestore
        const moduleIdValue = moduleId._path.segments[1];
        const response = await axios.get(`http://localhost:3000/module/${moduleIdValue}`);
        if (!response.data) {
          console.error("Le document du module n'existe pas");
          return;
        }
        const moduleName = response.data.nom;
        setModuleName(moduleName);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom du module :', error);
      }
    };

    fetchModuleName();
  }, [moduleId]);

  return (
    <div className="featured">
      <div className="top">
        <div className="title">Element de Module</div>
        {/* Ajoutez d'autres éléments si nécessaire */}
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={pourcentage} text={`${pourcentage}%`} strokeWidth={5} />
        </div>
        <p className="title">{nom}</p>
        <p className="amount">{code}</p>
        <p className="amount">{moduleName}</p>
        <p className="desc">{description}</p>
      </div>
    </div>
  );
};

export default ElementModuleInfo;
