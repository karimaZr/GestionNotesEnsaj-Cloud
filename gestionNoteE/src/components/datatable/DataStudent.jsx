import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { studentColumns, userRows } from "../../datatablesource";
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
const DataStudent = () => {

    const [file, setFile] = useState(null);
    const [filiere, setFiliere] = useState('');
    const [studentsData, setStudentData] = useState([]);
    const [fields, setFields] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get('http://localhost:3000/filiere/');
                setFields(response.data); // Assuming the response contains an array of field objects
            } catch (error) {
                console.error('Error fetching fields:', error);
            }
        };

        fetchFields();
    }, []);

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
            // Assuming each subsequent row contains student data
            const students = parsedData.slice(1).map((row) => ({
                nom: row[0], // Assuming nom is in the first column
                prenom: row[1], // Assuming prenom is in the second column
                dateNaissance: row[2], // Assuming dateNaissance is in the third column
                CIN: row[3], // Assuming CIN is in the fourth column
                CNE: row[4], // Assuming CNE is in the fifth column
                email: row[5], // Assuming email is in the sixth column
                motDePasse: row[6], // Assuming motDePasse is in the seventh column
                photo: row[7], // Assuming photo is in the eighth column
            }));

            setStudentData(students);
        };
        reader.readAsArrayBuffer(uploadedFile);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3000/etudiant/', {
                filiereId: filiere,
                students: studentsData,
            });
            console.log(response.data);

        } catch (error) {
            console.error('Error creating professors:', error);

        }
    };


    useEffect(() => {
        const q = query(collection(db, "users"), where("role", "==", "etudiant"));
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
            const response = await fetch(`http://localhost:3000/etudiant/${id}`, {
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
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/students/view/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
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
                Add Students
            </div>
            <div className='dtaa'>
                <form onSubmit={handleFormSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <select value={filiere} onChange={(e) => setFiliere(e.target.value)}>
                        {fields.map((field) => (
                            <option key={field.id} value={field.id}>{field.nom}</option>
                        ))}
                    </select>
                    <button type="submit">Upload</button>
                </form>
            </div>


            <DataGrid
                className="datagrid"
                rows={data}
                columns={studentColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>

    );
};

export default DataStudent;
