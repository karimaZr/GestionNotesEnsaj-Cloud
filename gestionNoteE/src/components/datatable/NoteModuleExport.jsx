import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./modulenote.scss"
import { useParams } from "react-router-dom";

const ModuleNotes = ({  }) => {
  const [elementModules, setElementModules] = useState([]);
  const [etudiantModules, setEtudiantModules] = useState([]);
  const [notesGreaterThan10, setNotesGreaterThan10] = useState([]);
  const [notesLessThan12, setNotesLessThan12] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchElementModules = async () => {
      try {
        const moduleResponse = await axios.get(`http://localhost:3000/elementModule/module/${id}/2023-2024`);
        const moduleData = await moduleResponse.data;

        if (moduleData && Array.isArray(moduleData.elementModules)) {
          const elementModules = moduleData.elementModules;
          setElementModules(elementModules);

          const etudiantsResponse = await axios.get(`http://localhost:3000/etudiant/module/${id}`);
          const etudiantsData = await etudiantsResponse.data;
          setEtudiantModules(etudiantsData);

          if (etudiantsData) {
            const updatedEtudiantModules = await Promise.all(
              etudiantsData.map(async (etudiant) => {
                let totalScore = 0;

                for (const elementModule of elementModules) {
                  try {
                    const noteResponse = await axios.get(`http://localhost:3000/note/etudiants/${etudiant.CNE}/elementmodule/${elementModule.code}/note`);
                    const noteData = noteResponse.data;

                    if (noteData !== undefined) {
                      totalScore += (noteData.note * elementModule.pourcentage) / 100;
                    } else {
                      totalScore += 0;
                    }
                  } catch (error) {
                    console.error(`Erreur lors de la récupération des notes pour l'étudiant ${etudiant.cne} et l'élément de module ${elementModule.code}:`, error);
                  }
                }

                return { ...etudiant, totalScore };
              })
            );

            setEtudiantModules(updatedEtudiantModules);
            filterNotes(updatedEtudiantModules);
          } else {
            console.error('Erreur: Aucune donnée récupérée pour les étudiants.');
          }
        } else {
          console.error('Erreur: Aucune donnée récupérée pour les éléments de module.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    const filterNotes = (etudiants) => {
      const greaterThan10 = etudiants.filter((etudiant) => etudiant.totalScore > 12);
      const lessThan12 = etudiants.filter((etudiant) => etudiant.totalScore < 12);
      setNotesGreaterThan10(greaterThan10);
      setNotesLessThan12(lessThan12);
    };

    fetchElementModules();
  }, [id]);
  const printToPDF = (elementId, fileName) => {
    const input = document.getElementById(elementId);

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

      // Supprimer la colonne de la note totale
      const tableRows = input.querySelectorAll('tr');
      tableRows.forEach(row => {
        const lastCell = row.lastElementChild;
        if (lastCell.classList.contains('exclude-from-pdf')) {
          row.removeChild(lastCell);
        }
      });

      // Sauvegarder le PDF
      pdf.save(`${fileName}.pdf`);
    });
  };

  return (
    <div>
      <div className="section">
        <h1>Listes des Étudiants Validés le Module</h1>
        <button className="export-button" onClick={() => printToPDF('notesGreaterThan10', 'Notes_sup_10')}>Export Notes</button>
      </div>
      <div id="notesGreaterThan10" className="table-section">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CNE</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Note totale</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {notesGreaterThan10.map((etudiant, index) => (
                <TableRow key={index}>
                  <TableCell>{etudiant.CNE}</TableCell>
                  <TableCell>{etudiant.nom}</TableCell>
                  <TableCell>{etudiant.prenom}</TableCell>
                  <TableCell>{etudiant.totalScore}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="section">
        <h1>Listes des Étudiants Convoqués au Rattrapage</h1>
        <button className="export-button" onClick={() => printToPDF('notesLessThan12', 'Notes_inf_12')}>Export Notes</button>
      </div>
      <div id="notesLessThan12" className="table-section">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CNE</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Note totale</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notesLessThan12.map((etudiant, index) => (
                <TableRow key={index}>
                  <TableCell>{etudiant.CNE}</TableCell>
                  <TableCell>{etudiant.nom}</TableCell>
                  <TableCell>{etudiant.prenom}</TableCell>
                  <TableCell>{etudiant.totalScore}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}; 
export default ModuleNotes;
