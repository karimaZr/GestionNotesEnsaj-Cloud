// NotesChart.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NotesChart = ({ aspect, selectedModule }) => {
  const [notes, setNotes] = useState([]);
  const [moduleName, setModuleName] = useState("");

  const fetchData = (elementModuleCode, elementModuleId) => {
    if (!elementModuleCode || !elementModuleId) return;
    // Effectuer une requête HTTP pour récupérer les notes de l'élément de module sélectionné
    axios
      .get(`http://localhost:3000/note/${elementModuleCode}/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des notes :", error);
      });
  };

  useEffect(() => {
    if (selectedModule) {
      fetchData(selectedModule.code, selectedModule.id);
      setModuleName(selectedModule.nom); // Définir le nom de l'élément de module
    }
  }, [selectedModule]);

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
      <div className="title">Note de l'élément de module {moduleName} choisi</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={500}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="cne" stroke="gray" />
          <YAxis stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="note"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            dot={(props) => {
              const { cx, cy, note } = props;
              let fill = "#8884d8";
              let r = 5;
              if (note === maxNote) {
                fill = "#dddd";
              } else if (note === minNote) {
                fill = "green";
                r = 7;
              }
              return <circle cx={cx} cy={cy} fill={fill} r={r} />;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotesChart;
