import React, { useEffect, useState, useContext } from 'react'; // Importez useContext
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../sidebarstd/Sidebar';
import { AuthContext } from '../../../context/AuthContext'; // Importez AuthContext

function Student() {
  const [studentNotes, setStudentNotes] = useState([]);
  const [moduleElements, setModuleElements] = useState([]);
  const { moduleId } = useParams();
  const { currentUser } = useContext(AuthContext); // Utilisez AuthContext ici
  const currentUserCNE = currentUser ? currentUser.CNE : ''; // Utilisez currentUser

  useEffect(() => {
    const fetchModuleElements = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/elementModule/module/${moduleId}/2023-2024`);
        setModuleElements(response.data.elementModules);
        console.log(response.data.elementModules);
      } catch (error) {
        console.error('Erreur lors du chargement des éléments de module:', error);
      }
    };

    fetchModuleElements();
  }, [moduleId]);

  useEffect(() => {
    const fetchStudentNotes = async () => {
      try {
        const promises = moduleElements.map(async (element) => {
            console.log(currentUserCNE);
          const response = await axios.get(`http://localhost:3000/note/etudiants/${currentUserCNE}/elementmodule/${element.code}/note`);
          return response.data;
        });

        const notes = await Promise.all(promises);
        setStudentNotes(notes.flat()); // Aplatir le tableau de tableaux de notes
      } catch (error) {
        console.error('Erreur lors du chargement des notes de l\'étudiant:', error);
      }
    };

    fetchStudentNotes();
  }, [currentUserCNE, moduleElements]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table des notes">
              <TableHead>
                <TableRow>
                  <TableCell>Nom de l'Élément du Module</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell>status</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {studentNotes.map((note, index) => (
                  <TableRow key={index}>
                    <TableCell>{note.elementModuleCode}</TableCell>
                    <TableCell>{note.note}</TableCell>
                    <TableCell>{note.Status}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Student;
