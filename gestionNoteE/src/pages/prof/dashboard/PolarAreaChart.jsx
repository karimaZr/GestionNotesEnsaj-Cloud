import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import "./chart/chart.scss"
import { useParams } from "react-router-dom";

const PolarAreaChart = ({  }) => {
  const [elementModules, setElementModules] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [profCIN, setProfCIN] = useState(null);
  const { userId } = useParams();
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
      setProfCIN(profData.CIN); // Extrayez le CIN du professeur de la réponse
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du professeur:', error);
    }
  };

  fetchProfInfo(); // Appelez la fonction pour récupérer les informations du professeur
}, [userId]);

  useEffect(() => {
    if (profCIN) {
      axios.get(`http://localhost:3000/elementModule/elementModules/prof/${profCIN}/2023-2024`)
        .then(response => {
          setElementModules(response.data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des éléments de module :", error);
        });
    }
  }, [profCIN]);

  useEffect(() => {
    const fetchDataForChart = async () => {
      const data = await formatDataForChart();
      setChartData(data);
    };
    
    // Vérifier si toutes les notes maximales ont été récupérées avant de dessiner le graphique
    if (elementModules.length > 0) {
      fetchDataForChart();
    }
  }, [elementModules]);

  const fetchData = async (elementModuleCode) => {
    try {
      const response = await axios.get(`http://localhost:3000/note/${elementModuleCode}/notes`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error);
      return [];
    }
  };

  const formatDataForChart = async () => {
    const data = {
      datasets: [{
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'], // Couleurs de fond pour chaque ensemble de données
        label: 'NoteMax'
      }],
      labels: []
    };
    
    for (const module of elementModules) {
      const notes = await fetchData(module.code);
      const maxNote = Math.max(...notes.map(note => note.note));

      data.datasets[0].data.push(maxNote);
      data.labels.push(module.nom);
    }
    
    return data;
  };

  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      r: {
        grid: {
          color: '#ebedef'
        }
      }
    }
  };

  return (
    <div className="chart">
      <div className="title">la Note Maximale dans chaque élement de Module Pour L'année 2023-24</div>
      {chartData && <Chart type="polarArea" data={chartData} options={lightOptions} style={{ width: '100%', height: '50vh' }} />}
    </div>
  );
};

export default PolarAreaChart;
