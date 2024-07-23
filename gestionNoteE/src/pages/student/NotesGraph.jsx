import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { AuthContext } from "../../context/AuthContext";

const StudentNotesChart = () => {
  const [notes, setNotes] = useState([]);
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

          setNotes(notesData);
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
      <LineChart width={600} height={300} data={notes}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={[0, 20]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="note"
          stroke="#8884d8"
          dot={{ r: 5, fill: (entry) => (entry.status === 'V' ? 'green' : 'red') }}
        />
      </LineChart>
    </div>
  );
};

export default StudentNotesChart;
