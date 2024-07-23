import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { AuthContext } from "../../context/AuthContext";

const StudentNotesChart = () => {
    const [notesByYear, setNotesByYear] = useState([]);
    const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchStudentNotes = async () => {
      try {
        // Récupérer l'étudiant à partir de l'authUserId
        const studentResponse = await axios.get(`http://localhost:3000/etudiant/?authUserId=${currentUser.id}`);
        const student = studentResponse.data[0];

        if (student) {
          // Récupérer les notes à partir du CNE
          const notesResponse = await axios.get(`http://localhost:3000/note/etudiants/${student.CNE}/note`);
          const notesData = notesResponse.data.map((note) => ({
            id: note.id,
            year: note.AnneeUniversitaire,
            note: parseFloat(note.note),
            status: note.Status,
            elementCode: note.elementModuleCode,
          }));

          // Grouper les notes par année
          const notesGroupedByYear = notesData.reduce((acc, note) => {
            if (!acc[note.year]) {
              acc[note.year] = [];
            }
            acc[note.year].push(note);
            return acc;
          }, {});

          setNotesByYear(notesGroupedByYear);
        } else {
          console.log("Aucun étudiant trouvé pour userId:", userId);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des notes:", error);
      }
    };

    fetchStudentNotes();
  }, [currentUser.id]);

  return (
    <div>
      <h2>Notes Chart</h2>
      <BarChart width={600} height={300} data={notesByYear}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={[0, 20]} />
        <Tooltip />
        <Legend />
        {Object.keys(notesByYear).map((year) => (
          <Bar
            key={year}
            dataKey="note"
            data={notesByYear[year]}
            name={year}
            fill="#8884d8"
            stackId="a"
          />
        ))}
      </BarChart>
    </div>
  );
};

export default StudentNotesChart;
