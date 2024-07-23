import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../sidebar1/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ElementModuleInfo from "./ElementModuleInfo";
import Chart from "../dashboard/chart/ChartDetail";
import EtudiantsList from "./etudiants/Etudiants";
import { useParams } from 'react-router-dom'; // Importez useParams depuis react-router-dom

const Details = () => {
  const { elementModuleId } = useParams();
  console.log("Valeur de elementModuleId dans le composant parent :", elementModuleId);

  const [elementModule, setElementModule] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/elementModule/${elementModuleId}`)
      .then(response => {
        setElementModule(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'élément de module :", error);
      });
  }, [elementModuleId]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div style={{ boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)", padding: "10px", margin: "20px", display: "flex" }}>
          <h1 style={{ color: "lightgray", fontSize: "20px" }}>Professeur Cours</h1>
        </div>
        <div className="charts">
          {elementModule && <ElementModuleInfo elementModule={elementModule} />}
          {elementModule && <Chart title="note Etudiant" aspect={2 / 1} elementModuleCode={elementModule.code} />}
        </div>
        <div className="listContainer">
          <div className="listTitle">Liste des Etudiants</div>
          <EtudiantsList elementModuleId={elementModuleId} />
        </div>
      </div>
    </div>
  );
};

export default Details;
