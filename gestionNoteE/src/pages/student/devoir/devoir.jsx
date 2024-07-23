import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './widget.scss';
import './devoir.scss';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../sidebarstd/Sidebar';


const DevoirWidget = ({ elementModuleId }) => {
  const [devoirs, setDevoirs] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchDevoirs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/devoir/dev/9Q7WulzSgYqpegeKfCLB`);
        setDevoirs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des devoirs:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/etudiant/elementmodule/9Q7WulzSgYqpegeKfCLB`);
        setStudents(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants:", error);
      }
    };

    fetchDevoirs();
    fetchStudents();
  }, [elementModuleId]);

  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <h2
            style={{
              fontSize: '24px', // Taille de la police
              textAlign: 'center', // Centrer le texte
              padding: '10px', // Espace entre le texte et la bordure
              borderRadius: '10px', // Bordure arrondie
              margin: '20px 0', // Espace autour du titre
              fontWeight: 'bold', // Texte plus épais
              textTransform: 'uppercase', // Texte en majuscules
              backgroundColor: "rgba(0, 0, 255, 0.2)", color: "purple"
            }}
          >
            Voici les devoirs que vous devez réaliser
          </h2>
    <div className="widget-container">
      {devoirs.map((devoir) => (
        <div key={devoir.id} className="widget">
          <div className="left">
            <span className="title">{devoir.titre}</span>
            <span className="dates">
              Du: {new Date(devoir.datedebut).toLocaleDateString()} -
              Au: {new Date(devoir.dateFin).toLocaleDateString()}
            </span>
            <a href={devoir.file} download className="link">
               Télécharger le devoir
            </a>
          </div>
          <div className="right">
            <KeyboardArrowUpIcon className="icon" style={{ backgroundColor: "rgba(0, 0, 255, 0.2)", color: "purple"}} />
          </div>
        </div>
      ))}
    </div>
    </div>
        </div>
  );
};

export default DevoirWidget;
