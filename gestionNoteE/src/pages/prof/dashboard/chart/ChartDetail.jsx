import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell // Importez Cell de 'recharts'
} from "recharts";
import "./chart.scss";

const Chart = ({ aspect, title, elementModuleCode }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Effectue une requête HTTP pour récupérer les données des notes pour l'élément de module spécifié
    if (elementModuleCode) {
      axios
        .get(`http://localhost:3000/note/${elementModuleCode}/notes`)
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des notes :", error);
        });
    }
  }, [elementModuleCode]);

  // Fonction pour formatter les données pour le graphique
  const formatDataForChart = () => {
    return notes.map((note) => ({
      cne: note.etudiantCNE,
      note: note.note,
    }));
  };

  const data = formatDataForChart();

  // Trouver la note maximale
  const maxNote = Math.max(...data.map((item) => item.note));
  // Trouver la note minimale
  const minNote = Math.min(...data.map((item) => item.note));

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="" stroke="gray" interval={0}/>
          <YAxis stroke="gray" interval={0} />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Bar
            dataKey="note"
            barSize={10} // Taille des barres
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.note === maxNote ? "red" : entry.note === minNote ? "green" : "gray"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
