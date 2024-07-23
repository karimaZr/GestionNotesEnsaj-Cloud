import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ProfColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";
const DataProf = () => {

    const [file, setFile] = useState(null);
    const [profData, setProfData] = useState([]);
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        // Read Excel file
        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Assuming the first row contains headers
            const headers = parsedData[0];
            // Assuming each subsequent row contains professor data
            const profs = parsedData.slice(1).map((row) => ({
                nom: row[0], // Assuming nom is in the first column
                prenom: row[1], // Assuming prenom is in the second column
                CIN: row[2],
                telephone: row[3], // Assuming CIN is in the fourth column
                photo: row[4], // Assuming photo is in the fifth column
                specialite: row[5], // Assuming specialite is in the sixth column
                email: row[6] // Assuming email is in the seventh column

            }));

            setProfData(profs);
        };
        reader.readAsArrayBuffer(uploadedFile);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Iterate through each professor and make a POST request for each one
            for (const prof of profData) {
                // Make a POST request to backend endpoint for each professor
                console.log(prof);
                const response = await axios.post('http://localhost:3000/prof/', prof);
                console.log(response.data);
            }
            // Optionally display a success message after all professors are created
            alert('Professors created successfully!');
        } catch (error) {
            console.error('Error creating professors:', error);
            // Optionally display an error message
            alert('Error creating professors. Please try again.');
        }
    };


    useEffect(() => {
        const q = query(collection(db, "users"), where("role", "==", "prof"));
        const unsub = onSnapshot(
            q,
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/prof/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };


    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">Edit</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add Teacher
            </div>
            <div className='dtaa'>
                <form onSubmit={handleFormSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>


            <DataGrid
                className="datagrid"
                rows={data}
                columns={ProfColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>

    );
};

export default DataProf;
