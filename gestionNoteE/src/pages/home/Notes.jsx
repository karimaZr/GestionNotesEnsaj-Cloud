import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataNotesStudent = () => {
    const [elementData, setElementData] = useState([]);
    const [notesData, setNotesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make the API call to fetch notes for the specific student
                const response = await axios.get('http://localhost:3000/note/');

                // Set the fetched notes data to the state
                setNotesData(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchData(); // Call the function to fetch data
    }, []);

    useEffect(() => {
        const fetchElementData = async () => {
            try {
                // Make the API call to fetch element data
                const response = await axios.get('http://localhost:3000/elementModule/');
                // Set the fetched element data to the state
                setElementData(response.data);
                setIsLoading(false); // Data fetching completed
            } catch (error) {
                console.error('Error fetching element data:', error);
            }
        };

        fetchElementData(); // Call the function to fetch element data
    }, []);

    return (
        <div>
            <TableContainer component={Paper} className="table">
                <Table aria-label="student notes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Code Element</TableCell>
                            <TableCell>Nom Element</TableCell>
            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3}>Loading...</TableCell>
                            </TableRow>
                        ) : elementData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3}>No data available</TableCell>
                            </TableRow>
                        ) : (
                            elementData.map((element, index) => {
                                // Find the notes added date for each element
                                const notesAddedDate = notesData
                                    .filter(note => note.elementModuleCode === element.code)
                                    .map(note => new Date(note.timeStamp._seconds))
                                    .sort((a, b) => b - a)[0]; // Get the latest date

                                return (
                                    <TableRow key={index}>
                                        <TableCell>{element.code}</TableCell>
                                        <TableCell>{element.nom}</TableCell>
                                        
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataNotesStudent;